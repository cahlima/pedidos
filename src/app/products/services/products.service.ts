import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { of } from 'rxjs'
import { tap, delay, catchError, first, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly API = "/assets/products.json"; // api/products
  private readonly API_CLIENT = "/assets/product.json"; // api/product

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Product[]>(this.API).pipe(
      first(),
    );
    // .pipe(
    //   delay(5000)
    //   tap(products => console.log(products))
    // )
  }

  loadById(id: number) {
    // TODO - `${this.API}/${id}`
    let values = this.httpClient.get<Product>(this.API_CLIENT).pipe(
      first()
    );
    return values;
  }

  save(record: Partial<Product>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Product>) {
    return this.httpClient.post<Product>(this.API, record).pipe(
      first()
    ); 
  }

  private update(record: Partial<Product>) {
    // TODO - `${this.API}/${record.id}`
    return this.httpClient.put<Product>(this.API, record).pipe(
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
