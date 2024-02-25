import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsParametersService {

  constructor() { }

  requestParamsArr : (string | null)[] = [];
}


/**
 * 
 * this is basically a query builder built from scratch 
 * every service that contacts an API that takes queries pushes the query in this array,
 * and then pulls the array content and joins it with "&"
 * 
 */