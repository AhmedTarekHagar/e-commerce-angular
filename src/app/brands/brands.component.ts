import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../services/brands.service';
import { Router } from '@angular/router';
import { Brand } from '../interfaces/brand';
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _BrandsService: BrandsService, private _Router: Router, private _FilterService:FilterService) { }

  ngOnInit(): void {
    localStorage.setItem('lastPage', '/brands')

    this._BrandsService.getAllBrandsReq().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (err) => {
        this._Router.navigate(['/timedout'])
      }
    })
  }

  brands!:Brand[];

  setFilterValue(name: string): void {
    this._FilterService.filterValue = name;
  }
}
