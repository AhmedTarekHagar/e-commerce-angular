import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterValue:string = "all";
}
