import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Client } from '../model/client';
import { ClientsService } from '../services/clients.service';

export const ClientResolver: ResolveFn<Observable<Client>> = (route, state,  service: ClientsService = inject(ClientsService)) => {

  if (route.params?.['id']){
    return service.loadById(route.params['id']);
  }
  return of<Client>({
    id: -1,
    name: "",
    surname: "",
    cpf: ""});
};