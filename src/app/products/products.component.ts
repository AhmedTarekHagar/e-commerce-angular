import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _ProductsService: ProductsService, private _Router: Router) { }

  loadingFlag: boolean = true;
  searchValue:string = ""; 

  placeHolderIterations: number[] = Array(24).fill(0);

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/products')

    this._ProductsService.getAllProductsReq().subscribe({
      next: (res) => {
        this.allProducts = res.data;
      },
      error: (err) => {
        if (err) {
          this._Router.navigate(['/timedout'])
        }
      },
      complete: () => {
        this.loadingFlag = false;
      }
    })
  }

  allProducts!: Product[];

  productsCarouselConfiguration: OwlOptions = {
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

}
