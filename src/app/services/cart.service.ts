import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }

  userHeader: any = { token: localStorage.getItem("userToken") };
  baseURL: string = `https://ecommerce.routemisr.com`;
  cartItemsCount:BehaviorSubject<any> = new BehaviorSubject('0');

  addToCartReq(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/cart`, { productId: productId }, {
      headers: this.userHeader
    })
  }

  updateItemQuantityReq(productId: string, productCount: number): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/cart/${productId}`, { count: productCount }, {
      headers: this.userHeader
    })
  }

  getLoggedUserAllCartItemsReq(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/cart`, { headers: this.userHeader })
  }

  removeItemFromCartReq(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart/${productId}`, { headers: this.userHeader })
  }

  clearCartReq(): Observable<any> {
    return this._HttpClient.delete(`${this.baseURL}/api/v1/cart`, { headers: this.userHeader })
  }
}
