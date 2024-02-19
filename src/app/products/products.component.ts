import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _ProductsService: ProductsService, private _Router: Router) { }

  loadingFlag:boolean = true;

  placeHolderIterations:number[] = Array(24).fill(0);

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
      complete: ()=>{
        this.loadingFlag = false;
      }
    })
  }

  allProducts!: Product[];


}
