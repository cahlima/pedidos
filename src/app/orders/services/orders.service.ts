import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../model/order';
import { of } from 'rxjs';
import { tap, delay, catchError, first, map, retry } from 'rxjs/operators';
import { OrderItem } from '../model/orderItem';
import { OrderItemRequest } from '../model/orderItemRequest';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly API = 'http://localhost:5000/pedidos';
  private readonly API_ITEM = 'http://localhost:5000/item-do-pedido';

  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      responseType: 'text',
    }),
  };

  list(cpf: String) {
    return this.httpClient
      .get<Order[]>(this.API + '/cpf/' + cpf)
      .pipe(retry(2));
  }

  loadByPedidoId(id: number) {
    return this.httpClient
      .get<OrderItem[]>(this.API_ITEM + '/' + id)
      .pipe(retry(2));
  }

  save(record: Partial<Order>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }
  public responseData: string = '';

  saveItens(record: OrderItemRequest) {
    console.log('record');
    console.log(record);
    console.log('record');

    return this.httpClient.post<string>(
      this.API + '/create',
      record,
      this.httpOptions
    );
  }
  private create(record: Partial<Order>) {
    return this.httpClient.post<Order>(this.API, record).pipe(first());
  }

  private update(record: Partial<Order>) {
    return this.httpClient.put<Order>(this.API, record).pipe(first());
  }

  delete(id: number) {
    return this.httpClient.delete(this.API).pipe(first());
  }
}
