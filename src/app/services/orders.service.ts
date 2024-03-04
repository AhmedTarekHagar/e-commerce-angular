import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient: HttpClient) { }

  baseURL: string = `https://ecommerce.routemisr.com`
  redirectURL: string = `url=https://ahmedtarekhagar.github.io/e-commerce-angular`

  creditCardCheckOut(cartId: string, addressFormValue: any): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/orders/checkout-session/${cartId}?${this.redirectURL}`, { shippingAddress: addressFormValue });
  }

  getUserOrdersReq(): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/orders/user/${localStorage.getItem("userId")}`);
  }
}
