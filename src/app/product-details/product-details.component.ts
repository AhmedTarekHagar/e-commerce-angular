import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { ProductDetails } from '../product-details';
import { Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _Router: Router,
    private _Title: Title) { }

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((route) => {
      this.productId = route['id']
      localStorage.setItem('lastPage', `/productdetails/${this.productId}`)
    })

    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productData = res.data
        this._Title.setTitle(`${this.productData.title.split(" ", 2).join(" ")} : ${this._Title.getTitle()}`)
        this.productDetailsFlag = true
      },
      error: (err) => {
        if (err) {
          this._Router.navigate(['/notfound'])
        }
      }
    })


  }

  productDetailsFlag: boolean = false;
  productData!: ProductDetails
  productId!: string

  productCarouselConfiguration: OwlOptions = {
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
