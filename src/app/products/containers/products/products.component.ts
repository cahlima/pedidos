import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductsService } from '../../services/products.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]> | null = null;
  displayedColumns: string[] = ['description', 'actions'];

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.products$ = this.productsService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar produtos.');
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(product: Product) {
    this.router.navigate(['edit', product.id], { relativeTo: this.route });
  }

  onDelete(product: Product) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover esse produto?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.productsService.delete(product.id).subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Produto removido com sucesso!', 'X', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          error: () => this.onError('Erro ao tentar remover produto.'),
        });
      }
    });
  }
}
