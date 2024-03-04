import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthenticationService: AuthenticationService, private _Router: Router, private _CartService: CartService) { }

  ngOnInit(): void {

    this._AuthenticationService.userInfo.subscribe(() => {
      if (this._AuthenticationService.userInfo.getValue() == null) {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    })
    this._CartService.getLoggedUserAllCartItemsReq().subscribe({
      next: (res) => {
        this._CartService.cartItemsCount.next(res.numOfCartItems);
      }
    });


    this._CartService.cartItemsCount.subscribe(() => {
      this.cartItemsNumber = this._CartService.cartItemsCount.getValue()
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this._AuthenticationService.handleUserInfo();
    localStorage.removeItem("userId");
    this._Router.navigate(['/login'])
  }

  isLoggedIn: boolean = false;
  cartItemsNumber: string = '';
}
