import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Client } from './../../model/client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent {
  form = this.formBuilder.group({
    id: [-1],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    surname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]]
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: ClientsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute ) {
  }

  ngOnInit(): void {
    const client: Client = this.route.snapshot.data['client'];
    this.form.setValue({
      id: client.id,
      name: client.name,
      surname: client.surname,
      cpf: client.cpf
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
    this.snackBar.open("Cliente salvo com sucesso!", '', {duration: 2000});
    this.onCancel();
  }

  private onError() {
    this.snackBar.open("Erro ao salvar o cliente!", '', {duration: 2000});
    // TODO - Alterar quando chamar a API
    this.onCancel();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return "Campo obrigatório"
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors? field.errors['minlength']["requiredLength"] : 5;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres.`
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors? field.errors['maxlength']["requiredLength"] : 5;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`
    }
    return "Erro"
  }
}
