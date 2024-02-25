import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsParametersService } from '../requests-parameters.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  constructor(private _ProductsService: ProductsService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _RequestsParametersService: RequestsParametersService) { }
  ngOnDestroy(): void {
    this._RequestsParametersService.requestParamsArr.pop()
  }

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



}
