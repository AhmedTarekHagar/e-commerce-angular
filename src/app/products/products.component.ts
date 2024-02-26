import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsParametersService } from '../services/requests-parameters.service';
import { Metadata } from '../interfaces/metadata';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private _ProductsService: ProductsService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _RequestsParametersService: RequestsParametersService) { }
  
  categoryValue: string | null = null;

  loadingFlag: boolean = true;
  searchValue: string = "";

  placeHolderIterations: number[] = Array(24).fill(0);

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/products')

    this._ActivatedRoute.queryParams.subscribe({
      next: ((p) => {
        const queryString = Object.keys(p).map(key => {
          return decodeURIComponent(key) + '=' + encodeURIComponent(p[key]);
        }).join('&');

        this._RequestsParametersService.requestParamsArr.push(`${queryString}`);

      })
    })

    this.getProducts()
  }

  getProducts(pageNumber:number = 1) {
    this._ProductsService.getAllProductsReq(pageNumber).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.paginationData = res.metadata;
        this.productsCount = res.results;
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
  productsCount!:number;
  paginationData!: Metadata;

  pageChanged(event:number){
    this.getProducts(event);
  }
}