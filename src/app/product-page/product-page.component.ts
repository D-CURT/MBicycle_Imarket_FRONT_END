import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../product-getter.service';
import { CartService } from '../cart.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  store: string='может быть и есть';

  constructor(
    private getService: ProductGetterService,
    private cartService: CartService,
    private http: HttpClient
    ) { }

  ngOnInit() {
    this.product = this.getService.product;
    if (this.product.storeStatus) {
      this.store = 'est on sklad';
    }else{
      this.store = 'net takoi tovar';
    }
  }

  addingToCart() {
    let body = [{id: this.getService.product.id}]
    this.cartService.addProduct(this.getService.product.id);
    this.http.post('/orders/add', body).subscribe(
      (res: Response) => {
        console.log(res.status);
      }
    );
  }

}
