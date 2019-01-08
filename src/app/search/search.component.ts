import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../services/product-getter.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: any;
  item: any;

  constructor(
    private http: HttpClient,
    private getService: ProductGetterService,
    private global: GlobalService
    ) { }

  ngOnInit() {
    console.log('[SearchComponent.ngOnInit] Updating Search...');
    const searchStr = ((document.getElementById("searchInputId") as HTMLInputElement).value);
    this.http.get(this.global.host + '/products/allProductsSortedByNameWithNameLikeIgnoreCase/' + searchStr).subscribe(data => {
      this.products = data;
    });

  }

  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }

}
