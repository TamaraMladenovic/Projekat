import { Pipe, PipeTransform } from '@angular/core';
import { Smestaj } from '../models/smestaj';

@Pipe({
  name: 'pretraga'
})
export class PretragaPipe implements PipeTransform {

  transform(products: any[], searchText: string): any[] {
    if(!products) return [];
    else if (!searchText) return products;
    searchText = searchText.toLocaleLowerCase();
    return products.filter((smestaj: Smestaj) =>{
      return (smestaj.naziv.toLowerCase().includes(searchText) || 
              smestaj.grad.toLowerCase().includes(searchText) || 
              smestaj.adresa.toLowerCase().includes(searchText))
    })
  }

}
