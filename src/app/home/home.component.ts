import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../categories.service';
import { Router } from '@angular/router';
import { Category } from '../category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _CategoriesService: CategoriesService, private _Router: Router) { }

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
  }

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
        items: 6
      }
    },
    nav: true
  }
}
