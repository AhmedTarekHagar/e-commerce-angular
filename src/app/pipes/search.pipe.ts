import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allProducts: Product[], searchValue: string): Product[] {
    return allProducts.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()))
  }

}
