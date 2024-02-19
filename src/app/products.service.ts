import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  baseURL:string = `https://ecommerce.routemisr.com`;

  getAllProductsReq(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products`);
  }

  getSpecificProduct(id:string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${id}`)
  }
}
