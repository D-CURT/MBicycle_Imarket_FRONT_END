import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  purchases: any;
  total: number=0;

  products: any = [{
    price: '666',
    name: 'unnamed',
    descriptionPreview: 'Best product for everyone',
    storeStatus: 'true'
  },
  {
    price: '666',
    name: 'unnamed',
    descriptionPreview: 'Best product for everyone',
    storeStatus: 'true'
  },
  {
    price: '666',
    name: 'unnamed',
    descriptionPreview: 'Best product for everyone',
    storeStatus: 'true'
  }];

  constructor(
    private http: HttpClient,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.purchases = this.cartService.products;
    // this.http.get('/products/purchases').subscribe(data => {
    //   this.products = data;
    // })
    this.products.forEach(product => {
      this.total += parseInt(product.price);
    });
  }

  remove() {
    
  }

}
