import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

import { ProductGetterService } from '../services/product-getter.service';
import { CartService } from '../services/cart.service';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [SearchComponent],
})
export class NavBarComponent implements OnInit {

  isLogged: boolean;
  productCount: number;

  constructor(
    private router: Router,
    public getService: ProductGetterService,
    public cartService: CartService,
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {
    this.isLogged = false;
    this.productCount = 0;
  }

  setIsLogged() {
    this.isLogged = this.httpService.isLogged;
  }

  logout() {
    console.log('[Logout] Trying to logout...');
    this.isLogged = this.httpService.logout();
  }

  searchKeyPress(event) {
    if (event.key === 'Enter') {
      document.getElementById('searchInputId').blur();  // Unfocus search input to prevent multiple queries at one moment
      this.router.navigateByUrl('/index', {skipLocationChange: true})
        .then(() => this.router.navigate(['/search'])); // Костыль для перезагрузки данных
    }
  }
}
