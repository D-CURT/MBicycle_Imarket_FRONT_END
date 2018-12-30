import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(
    private http: HttpClient,
    private getGroupName: ProductGetterService
    ) { }

  ngOnInit() {
    this.http.get('/products/allProductsWithGroupSortedByName/' + this.getGroupName.groupName).subscribe(data => {
      this.products = data;
    })
  }

}
