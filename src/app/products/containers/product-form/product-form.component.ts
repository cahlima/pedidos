import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  form = this.formBuilder.group({
    id: [-1],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ProductsService,
    private utils: UtilsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    const product: Product = this.route.snapshot.data['product'];
    this.form.setValue({
      id: product.id,
      description: product.description
    })
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: this.onSuccess.bind(this), 
      error: this.onError.bind(this)})
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open("Produto salvo com sucesso!", '', {duration: 2000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o produto!", '', {duration: 2000});
    // TODO - Alterar quando chamar a API
    this.onCancel();
  }

  getErrorMessage(fieldName: string) {
    return this.utils.getErrorMessage(fieldName, this.form);
  }
}
