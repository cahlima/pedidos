import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/client';
import { of } from 'rxjs'
import { tap, delay, catchError, first, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private readonly API = "/assets/clients.json"; // api/clients
  private readonly API_CLIENT = "/assets/client.json"; // api/client

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Client[]>(this.API).pipe(
      first(),
    );
    // .pipe(
    //   delay(5000)
    //   tap(clients => console.log(clients))
    // )
  }

  loadById(id: number) {
    // TODO - `${this.API}/${id}`
    let values = this.httpClient.get<Client>(this.API_CLIENT).pipe(
      first()
    );
    return values;
  }

  save(record: Partial<Client>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Client>) {
    return this.httpClient.post<Client>(this.API, record).pipe(
      first()
    ); 
  }

  private update(record: Partial<Client>) {
    // TODO - `${this.API}/${record.id}`
    return this.httpClient.put<Client>(this.API, record).pipe(
      first()
    ); 
  }

  delete(id: number) {
    // TODO - `${this.API}/${id}`
    return this.httpClient.delete(this.API).pipe(
      first()
    ); 
  }
}
