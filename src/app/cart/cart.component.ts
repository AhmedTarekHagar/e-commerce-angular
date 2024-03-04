import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../interfaces/cart-item';
import { Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartService: CartService, private _Router: Router,
    private _ToastEvokeService: ToastEvokeService) { }

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/cart');

    this._CartService.getLoggedUserAllCartItemsReq().subscribe({
      next: (res) => {
        localStorage.setItem('userId', res.data.cartOwner);
        this.cartItems = res.data.products;
        this.total = res.data.totalCartPrice;
        this.cartId = res.data._id;
      }
    })
  }

  cartItems: CartItem[] = [];
  total!: number;
  cartId!: string;

  // delete
  removeItem(productId: string) {
    this._CartService.removeItemFromCartReq(productId).subscribe({
      next: (res) => {
        this._CartService.cartItemsCount.next(res.numOfCartItems);
        this._ToastEvokeService.success('Success', 'Item Removed from cart').subscribe();
        this.cartItems = res.data.products

      }
    })
  }

  // update Quantity
  updateQuatity(behaviour: string, productId: string, count: number) {
    if (behaviour == 'increment') {
      this._CartService.updateItemQuantityReq(productId, ++count).subscribe({
        next: (res) => {
          this.cartItems = res.data.products
        }
      })
    } else if (behaviour = 'decrement') {
      if (count == 1) {
        this.removeItem(productId)
      } else {
        this._CartService.updateItemQuantityReq(productId, --count).subscribe({
          next: (res) => {
            this.cartItems = res.data.products
          }
        })
      }
    }
  }

  // clear cart
  clearCart() {
    this._CartService.clearCartReq().subscribe({
      next: (res) => {
        this._ToastEvokeService.success('Success', 'Cart cleared').subscribe();
        this.cartItems = [];
        this._CartService.cartItemsCount.next(res.numOfCartItems);
      }
    })
  }
}
