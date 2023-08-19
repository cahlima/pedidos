import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Order } from './../../model/order';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { OrdersService } from '../../services/orders.service';
import { catchError, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders$: Observable<Order[]> | null = null;

  form = this.formBuilder.group({
    cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]]
  });

  loading = false;

  constructor(private ordersService: OrdersService,
    private formBuilder: NonNullableFormBuilder,
    public dialog: MatDialog,
    private utils: UtilsService ) {
  }

  refresh() {
    this.loading = true
    this.orders$ = this.ordersService.list().pipe(
      map((value: any) => {
        this.loading = value.type === 'start'
        return value
      }),
      catchError(error => {this.loading = false
      this.onError('Erro ao carregar os pedidos.')
      return of([]);
    }));
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    this.form.setValue({
      cpf: ""
    })
  }

  onSearch() {
    this.refresh();
  }

  getErrorMessage(fieldName: string) {
    return this.utils.getErrorMessage(fieldName, this.form);
  }
}
