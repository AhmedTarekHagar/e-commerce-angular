import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';
import { Category } from '../interfaces/category';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _CategoriesService: CategoriesService, private _Router: Router, private _CartService:CartService) { }

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/home')

    this._CategoriesService.getAllCategoriesReq().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        this._Router.navigate(['/timedout'])
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

  cartItemsNumber!:string;
  categories!: Category[];

  homeTopCarouselConfiguration: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  
  homeBottomCarouselConfiguration: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      768: {
        items: 6
      }
    },
    nav: true
  }
}
