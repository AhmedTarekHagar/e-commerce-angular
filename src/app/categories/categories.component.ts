import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Category } from '../category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService: CategoriesService, private _Router: Router) { }

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/categories')    

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

}
