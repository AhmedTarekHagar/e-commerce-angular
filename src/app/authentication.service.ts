import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

interface userDataInterface {
  name?: string,
  phone?: string,
  email?: string,
  password?: string,
  rePassword?: string,
  resetCode?: string,
  newPassword?: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(private _HttpClient: HttpClient) { }

  userInfo: BehaviorSubject<any> = new BehaviorSubject(null);

  baseURL: string = `https://ecommerce.routemisr.com`;

  registerReq(userData: userDataInterface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signup`, userData);
  }

  loginReq(userData: userDataInterface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/signin`, userData);
  }

  handleUserInfo() {
    if (localStorage.getItem('userToken') != null) {
      this.userInfo.next(localStorage.getItem('userToken'));
      this.userInfo.next(jwtDecode(this.userInfo.getValue()));
    } else {
      this.userInfo.next(null);
    }
  }

  forgetReq(userData: userDataInterface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/forgotPasswords`, userData)
  }

  verifyCodeReq(userData: userDataInterface): Observable<any> {
    return this._HttpClient.post(`${this.baseURL}/api/v1/auth/verifyResetCode`, userData)
  }

  resetPasswordReq(userData: userDataInterface): Observable<any> {
    return this._HttpClient.put(`${this.baseURL}/api/v1/auth/resetPassword`, userData)
  }
}
