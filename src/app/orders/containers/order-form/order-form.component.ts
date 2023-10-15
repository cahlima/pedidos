import { Component } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Product } from 'src/app/products/model/product';
import { ProductsService } from './../../../products/services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { OrderItemRequest } from './../../model/orderItemRequest';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { ItemPedidoRequest } from '../../model/ItemPedidoRequest';

interface ProductForm {
  product: null | Product; // Change the data type to match your actual data type
  quantity: FormControl<number | null>;
}

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  products$: Observable<Product[]> | null = null;
  myDate = new Date();
  form = this.formBuilder.group({
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
  });
  formProduct = this.formBuilder.group({
    product: new FormControl<Product | null>(null, [Validators.required]),
    quantity: new FormControl(1, [
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  addedProducts: any[] = [];

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private formBuilder: NonNullableFormBuilder,
    private service: OrdersService,
    private clientsService: ClientsService,
    private utils: UtilsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.form.setValue({
      cpf: '',
    });
    this.formProduct.setValue({
      product: null,
      quantity: 1,
    });
    this.loadData();
  }

  loadData() {
    this.products$ = this.productsService.list().pipe(
      catchError((error) => {
        this.onErrorLoading('Erro ao carregar produtos.');
        return of([]);
      })
    );
  }

  onErrorLoading(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  addProduct() {
    this.addedProducts.push(this.formProduct.value);
    this.formProduct.reset();
    this.formProduct.setValue({
      product: null,
      quantity: 1,
    });
    this.verifyDisabledProducts();
  }

  verifyDisabledProducts() {
    this.products$
      ?.pipe(
        map((data) => {
          for (let i = 0; i < data.length; i++) {
            data[i].disabled = this.productAlreadyAddedToOrder(data[i].id);
          }
          return data;
        })
      )
      .subscribe((modifiedData) => {
        this.products$ = of(modifiedData);
      });
  }

  productAlreadyAddedToOrder(productId: number) {
    return (
      this.addedProducts.findIndex(
        (ap: ProductForm) => ap.product && ap.product.id === productId
      ) !== -1
    );
  }

  onSubmit() {
    let cpf: string = this.form.value.cpf ? this.form.value.cpf : '';
    let orderItemRequest: any = {
      itensDoPedido: [
        ...this.addedProducts.map((op: any) => ({
          cod_produto: op.product.id,
          qtdade: op.quantity,
        })),
      ],
      cpf: cpf,
    };
    this.service.saveItens(orderItemRequest).subscribe({
      next: this.onSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.addedProducts = [];
    this.verifyDisabledProducts();
    this.snackBar.open('Pedido salvo com sucesso!', '', { duration: 2000 });
  }

  private onError(e: any) {
    this.snackBar.open(e.error, '', { duration: 2000 });
  }

  getErrorMessage(fieldName: string) {
    let isInForm =
      Object.keys(this.form.controls).findIndex((x) => x == fieldName) != -1;
    return this.utils.getErrorMessage(
      fieldName,
      isInForm ? this.form : this.formProduct
    );
  }
}
