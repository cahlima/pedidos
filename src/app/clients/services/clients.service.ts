import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { Client } from '../model/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private readonly API = 'http://localhost:5000/clientes';
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  list(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.API).pipe(
      map((res: any[]) => {
        const data = res.map((obj) => ({
          id: obj.cod_cliente,
          name: obj.nome,
          surname: obj.sobrenome,
          cpf: obj.cpf,
        }));
        return data;
      }),
      retry(2)
    );
  }

  loadById(id: number) {
    return this.httpClient.get<Client>(this.API + '/' + id).pipe(
      map((obj: any) => {
        const data = {
          id: obj.cod_cliente,
          name: obj.nome,
          surname: obj.sobrenome,
          cpf: obj.cpf,
        };
        return data;
      }),
      retry(2)
    );
  }

  save(record: Partial<Client>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Client>): Observable<Client> {
    return this.httpClient
      .post<Client>(
        this.API,
        {
          nome: record.name,
          sobrenome: record.surname,
          cpf: record.cpf,
        },
        this.httpOptions
      )
      .pipe(first());
  }

  private update(record: Partial<Client>) {
    return this.httpClient
      .put<Client>(
        this.API + '/' + record.id,
        {
          nome: record.name,
          sobrenome: record.surname,
          cpf: record.cpf,
        },
        this.httpOptions
      )
      .pipe(first());
  }

  delete(id: number) {
    return this.httpClient
      .delete<Client>(this.API + '/' + id, this.httpOptions)
      .pipe(retry(1));
  }
}
