import { Component, OnInit} from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;
  item: any;

  constructor(
    private getService: ProductGetterService,
    private httpService: HttpWorksService
    ) {  }

  ngOnInit() {
    this.httpService.getProductsByGroup(this.getService.groupName).subscribe(data => {
      this.products = data;
    });
  }

  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }
}
