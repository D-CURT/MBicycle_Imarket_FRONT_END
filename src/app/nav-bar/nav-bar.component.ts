import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

import { ProductGetterService } from '../services/product-getter.service';
import { CartService } from '../services/cart.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [SearchComponent],
})
export class NavBarComponent implements OnInit {

  isLogged: boolean;
  isDebug: boolean;

  productCount: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    public getService: ProductGetterService,
    public cartService: CartService,
    private global: GlobalService
    ) { }

  ngOnInit() {
    this.isDebug = false;   //Set true if debugging...
    this.isLogged = false;
    this.productCount = 0;
    //this.isLoggedN = this.getService.isLogged;
  }

  getCond() {
    console.log('isLog = ' + this.isLogged);
    console.log('while this.getService.isLog = ' + this.getService.isLogged);
  }

  setIsLogged(cond: boolean) {
    this.isLogged = cond;
  }

  manual() {
    this.isLogged = true;
  }

  logout() {
    console.log('[Logout] Trying to logout...');
    this.http.get(this.global.host + '/logout')
    .subscribe (
      (res: Response) => {
        console.log('[Logout] Some response: ' + res.text);
      },
      error => {
        let errorResponsed = error as Response;
        if(errorResponsed.url.endsWith('logoutdone')) {
          console.log('[Logout] Server Redirects, therefore logout is successfull.');
          this.getService.isLogged = false;
          this.isLogged = false;
          this.router.navigateByUrl('/index');
        }
      }
    );
  }

  searchKeyPress(event) {
    if(event.key === 'Enter') {
      document.getElementById('searchInputId').blur();  //Unfocus search input to prevent multiple queries at one moment
       this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/search"])); //Костыль для перезагрузки данных
    }
  }
}
