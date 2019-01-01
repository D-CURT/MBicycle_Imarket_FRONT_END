import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  store: string='может быть и есть';

  constructor(private getService: ProductGetterService) { }

  ngOnInit() {
    this.product = this.getService.product;
    if (this.product.storeStatus) {
      this.store = 'est on sklad';
    }else{
      this.store = 'net takoi tovar';
    }
  }

}
