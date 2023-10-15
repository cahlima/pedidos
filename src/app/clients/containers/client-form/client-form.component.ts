import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Client } from './../../model/client';
import { UtilsService } from './../../../shared/services/utils.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent {
  form = this.formBuilder.group({
    id: [-1],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(30)],
    ],
    surname: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    ],
    cpf: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientsService,
    private utils: UtilsService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const client: Client = this.route.snapshot.data['client'];
    this.form.setValue({
      id: client.id,
      name: client.name,
      surname: client.surname,
      cpf: client.cpf,
    });
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe({
      next: this.onSuccess.bind(this),
      error: this.onError.bind(this),
    });
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Cliente salvo com sucesso!', '', { duration: 2000 });
    this.onCancel();
  }

  private onError(e: any) {
    if (e.error.error.sqlstate === '23505') {
      this.snackBar.open('Já existe um cliente com esse CPF!', '', {
        duration: 2000,
      });
    } else {
      this.snackBar.open('Erro ao salvar o cliente!', '', { duration: 2000 });
    }
  }

  getErrorMessage(fieldName: string) {
    return this.utils.getErrorMessage(fieldName, this.form);
  }
}
