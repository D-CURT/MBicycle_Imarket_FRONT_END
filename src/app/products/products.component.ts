import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../services/product-getter.service';

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
    private http: HttpClient,
    ) {  }

  ngOnInit() {
    
    console.log('initialize');

    this.products = this.http.get('/products/allProductsWithGroupSortedByName/' + this.getService.groupName).subscribe(data => {
      this.products = data;
      console.log("inside http client");
    }) 
  }

  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }
}
