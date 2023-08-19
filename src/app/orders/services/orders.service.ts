import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order';
import { of } from 'rxjs'
import { tap, delay, catchError, first, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly API = "/assets/orders.json"; // api/clients
  private readonly API_ORDER = "/assets/order.json"; // api/client

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Order[]>(this.API).pipe(
      delay(5000),
      first(),
    );
    // .pipe(
    //   delay(5000)
    //   tap(orders => console.log(orders))
    // )
  }

  loadById(id: number) {
    // TODO - `${this.API}/${id}`
    let values = this.httpClient.get<Order>(this.API_ORDER).pipe(
      first()
    );
    return values;
  }

  save(record: Partial<Order>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Order>) {
    return this.httpClient.post<Order>(this.API, record).pipe(
      first()
    ); 
  }

  private update(record: Partial<Order>) {
    // TODO - `${this.API}/${record.id}`
    return this.httpClient.put<Order>(this.API, record).pipe(
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
