import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map, retry } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly API = 'http://localhost:5000/produtos';
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.API).pipe(
      map((res: any[]) => {
        const data = res.map((obj) => ({
          id: obj.id,
          description: obj.descricao,
          disabled: false,
        }));
        return data;
      }),
      retry(2)
    );
  }

  loadById(id: number) {
    return this.httpClient.get<Product>(this.API + '/' + id).pipe(
      map((obj: any) => {
        const data = {
          id: obj.id,
          description: obj.descricao,
        };
        return data;
      }),
      retry(2)
    );
  }

  save(record: Partial<Product>) {
    if (record.id && record.id != -1) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Product>): Observable<Product> {
    return this.httpClient
      .post<Product>(
        this.API,
        {
          descricao: record.description,
        },
        this.httpOptions
      )
      .pipe(first());
  }

  private update(record: Partial<Product>) {
    return this.httpClient
      .put<Product>(
        this.API + '/' + record.id,
        {
          descricao: record.description,
        },
        this.httpOptions
      )
      .pipe(first());
  }

  delete(id: number) {
    return this.httpClient
      .delete<Product>(this.API + '/' + id, this.httpOptions)
      .pipe(retry(1));
  }
}
