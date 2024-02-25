import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../brands.service';
import { Router } from '@angular/router';
import { Brand } from '../brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _BrandsService: BrandsService, private _Router: Router) { }

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
}
