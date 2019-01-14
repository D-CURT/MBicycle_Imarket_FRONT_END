import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import {HttpWorksService} from '../services/http-works.service';

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
    private cartService: CartService,
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {
    this.purchases = this.cartService.products;
    this.httpService.getProductsInCart().subscribe(data => {
      this.products = data;
    });
    this.products.forEach(product => {
      this.total += parseInt(product.price);
    });
  }

  remove(id) {
    const body = {productsIds: [id]};
    this.httpService.deleteProductsFromCart(body)
    for (let i in this.products) {
      if (this.products[i].id === id) {
        this.products.splice(i, 1);
        break;
      }
    }
  }
}
