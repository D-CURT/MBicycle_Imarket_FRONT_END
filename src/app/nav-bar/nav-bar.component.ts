import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';

import {Globals} from '../globals'
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [SearchComponent],
})
export class NavBarComponent implements OnInit {

  MyCtrl : any;
  isLogged: boolean=false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private searchComp: SearchComponent,
    private globals: Globals,
    private getService: ProductGetterService
    ) { }

  ngOnInit() {
    this.isLogged = this.getService.isLogged;
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

}
