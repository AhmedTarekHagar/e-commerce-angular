import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../interfaces/category';
import { Router } from '@angular/router';
import { FilterService } from '../services/filter.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService: CategoriesService, private _Router: Router, private _FilterService:FilterService) { }

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

  setFilterValue(name: string): void {
    this._FilterService.filterValue = name;
  }
}
