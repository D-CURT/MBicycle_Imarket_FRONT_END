import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../product-getter.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    console.log('[SearchComponent.ngOnInit] Updating Search...');
    var searchStr = ((document.getElementById("searchInputId") as HTMLInputElement).value);
    this.http.get('/products/allProductsSortedByNameWithNameLikeIgnoreCase/' + searchStr).subscribe(data => {
      this.products = data;
    })

  }

  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }

}
