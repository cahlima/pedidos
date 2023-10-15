import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getErrorMessage(fieldName: string, form: FormGroup) {
    const field = form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }
    if (field?.hasError('pattern')) {
      if (
        field.errors &&
        field.errors['pattern']['requiredPattern'] == '^[0-9]*$'
      ) {
        return 'Esse campo só aceita valores numéricos';
      }
    }
    if (field?.hasError('min')) {
      const requiredLength = field.errors ? field.errors['min']['min'] : 1;
      return `O valor deve ser maior que ${requiredLength}.`;
    }
    if (field?.hasError('minlength')) {
      const requiredLength = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `O tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 5;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Erro';
  }
}
