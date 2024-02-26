import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestsParametersService } from './requests-parameters.service';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient, private _RequestsParametersService: RequestsParametersService) { }

  baseURL: string = `https://ecommerce.routemisr.com`;

  getAllProductsReq(pageNumber:number = 1): Observable<any> {
    let query = this._RequestsParametersService.requestParamsArr.join('&');
    
    return this._HttpClient.get(`${this.baseURL}/api/v1/products?page=${pageNumber}&${query}`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseURL}/api/v1/products/${id}`)
  }
}
