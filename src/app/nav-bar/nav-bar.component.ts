import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

import {Globals} from '../globals'
import { ProductGetterService } from '../services/product-getter.service';
import { RegistrationComponent } from '../registration/registration.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [SearchComponent],
})
export class NavBarComponent implements OnInit {

  MyCtrl : any;
  isLogged: boolean;
  isDebug: boolean;

  productCount: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private searchComp: SearchComponent,
    private globals: Globals,
    public getService: ProductGetterService,
    public cartService: CartService
    ) { }

  ngOnInit() {
    this.isDebug = false;   //Set true if debugging...
    this.isLogged = false;
    this.productCount = 0;
    //this.isLoggedN = this.getService.isLogged;
  }

  getCond() {
    console.log('isLog = ' + this.isLogged);
    console.log('while this.getService.isLog = '+ this.getService.isLogged);
  }

  setIsLogged(cond: boolean) {
    this.isLogged = cond;
  }

  manual() {
    this.isLogged = true;
  }

  logout() {
    console.log('[Logout] Trying to logout...');
    //window.location.href='/logout';
    this.http.get('/logout')
    .subscribe (
      (res: Response) => {
        console.log('[Logout] Some response: ' + res.text);
      },
      error => {
        let errorResponsed = error as Response;
        if(errorResponsed.url.endsWith('logoutdone')) {
          console.log('[Logout] Server Redirects, therefore logout is successfull.');
          //TODO: Maybe somehow show a popup message that logout is successfull
          this.getService.isLogged = false;
          this.isLogged = false;
          this.router.navigateByUrl('/index');
        }
      }
    );
  }

  searchKeyPress(event) {
    if(event.key == 'Enter') {
      document.getElementById('searchInputId').blur();  //Unfocus search input to prevent multiple queries at one moment
      //if(this.router.url!='/search') {
        //this.router.navigate(['/search']);
      //}
      //this.searchComp.ngOnInit();
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(()=>this.router.navigate(["/search"])); //Костыль для перезагрузки данных
    }
  }

  onButtonCartClick() {
   
  }

}
