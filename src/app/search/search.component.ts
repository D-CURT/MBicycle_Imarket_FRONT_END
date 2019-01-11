import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  products: any;
  item: any;

  constructor(
    private getService: ProductGetterService,
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {
    console.log('[SearchComponent.ngOnInit] Updating Search...');
    const searchStr = ((document.getElementById('searchInputId') as HTMLInputElement).value);
    this.httpService.getSearchingProducts(searchStr).subscribe(data => {
      this.products = data;
    });
  }

  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }

}
