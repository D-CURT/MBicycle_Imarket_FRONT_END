import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  purchases: any;
  total: number = 0;

  products: any;
  // products: any = [{
  //   price: '666',
  //   name: 'unnamed',
  //   descriptionPreview: 'Best product for everyone',
  //   storeStatus: 'true'
  // },
  // {
  //   price: '666',
  //   name: 'unnamed',
  //   descriptionPreview: 'Best product for everyone',
  //   storeStatus: 'true'
  // },
  // {
  //   price: '666',
  //   name: 'unnamed',
  //   descriptionPreview: 'Best product for everyone',
  //   storeStatus: 'true'
  // }];

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private global: GlobalService
    ) { }

  ngOnInit() {
    this.purchases = this.cartService.products;
    this.http.get(this.global.host + '/orders/products').subscribe(data => {
      this.products = data;
      this.products.forEach(product => {
        this.total += parseInt(product.price);
      });
    });
  }

  remove(id) {
    const body = {productsIds: [id]};
    this.http.post(this.global.host + '/orders/deleteProduct', body).subscribe((res: Response) => {
      console.log(res.status);
    });
    for (let i in this.products) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
      }
    }
  }
}
