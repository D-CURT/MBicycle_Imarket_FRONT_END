import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import { CartService } from '../services/cart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  productsss: string[] = [];
  store = 'может быть и есть';

  constructor(
    private getService: ProductGetterService,
    private cartService: CartService,
    private http: HttpClient,
    private global: GlobalService
    ) { }

  ngOnInit() {
    this.product = this.getService.product;
    if (this.product.storeStatus) {
      this.store = 'est on sklad';
    } else {
      this.store = 'net takoi tovar';
    }
  }

  addingToCart() {
    this.productsss.push(this.getService.product.id)
    const body = {productsIds: this.productsss}
    this.http.post(this.global.host + '/orders/add', body).subscribe(
      (res: Response) => {
        console.log(res.status);
      }
    );
  }

}
