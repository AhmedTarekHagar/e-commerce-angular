import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsParametersService } from '../services/requests-parameters.service';
import { Metadata } from '../interfaces/metadata';
import { FilterService } from '../services/filter.service';
import { CartService } from '../services/cart.service';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  constructor(private _ProductsService: ProductsService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _RequestsParametersService: RequestsParametersService,
    private _FilterService: FilterService,
    private _CartService: CartService,
    private _ToastEvokeService: ToastEvokeService
  ) { }

  categoryValue: string | null = null;

  loadingFlag: boolean = true;
  searchValue: string = "";

  placeHolderIterations: number[] = Array(24).fill(0);

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/products')
    this._RequestsParametersService.requestParamsArr = [];

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

  ngAfterViewInit(): void {
    this._FilterService.filterValue = "all";
  }

  getProducts(pageNumber: number = 1) {
    this._ProductsService.getAllProductsReq(pageNumber).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.paginationData = res.metadata;
        this.productsCount = res.results;
        this.loadingFlag = false;
      },
      error: (err) => {
        this._Router.navigate(['/timedout']);
      }
    })
  }

  allProducts!: Product[];
  productsCount!: number;
  paginationData!: Metadata;

  filter: string = this._FilterService.filterValue;

  pageChanged(event: number) {
    this.getProducts(event);
  }

  addToCart(productId: string) {
    this._CartService.addToCartReq(productId).subscribe({
      next: (res) => {
        this._ToastEvokeService.success('Success',res.message).subscribe();
        this._CartService.cartItemsCount.next(res.numOfCartItems);
      },
      error: (err) => {
        this._ToastEvokeService.success('Error', err.message).subscribe();
      }
    })
  }
}