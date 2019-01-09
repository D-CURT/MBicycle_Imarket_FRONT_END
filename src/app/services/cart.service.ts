import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  products: number[];

  constructor() {
    this.products=[];
   }
  
  public addProduct(id: number) {
    this.products.push(id);
  }
  
}
