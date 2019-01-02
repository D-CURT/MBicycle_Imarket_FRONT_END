import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGetterService } from '../product-getter.service';
import { NavBarComponent} from '../nav-bar/nav-bar.component';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NavBarComponent, SearchComponent]
})
export class LoginComponent implements OnInit {

  model: any = {};

  isLogged: boolean; 
  isError: boolean;

  isHadden: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private getService: ProductGetterService,
    private navBarComponent: NavBarComponent
    ) { }

  ngOnInit() {
    this.isLogged=false;
    this.isError=false;
  }

  login() {

    this.isLogged=false;
    this.isError=false;

    let usr: string = this.model.username;
    let pas: string = this.model.password;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa(usr + ":" + pas)); 
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    this.http.post('/login', null, {headers: headers})
    
      .subscribe (
        (res: Response) => {
          console.log('[Login] Point Entry IN res: response');
        },
        (error) => {
          let errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status==404) {
            console.log('Login Successfull');
           (async () => {  
              await new Promise((resolve) => setTimeout(() => resolve(), 2000));
              this.isLogged=true;
              this.getService.isLogged = true;
              this.navBarComponent.setIsLogged(true);
              this.navBarComponent.isLogged = true;
              console.log('After set, isLog = ' + this.isLogged + ' | and getService.isLog = ' + this.getService.isLogged + " | and navBarComp.isLog = " + this.navBarComponent.isLogged);  
              this.router.navigateByUrl("/index"); 
            })();
          }
          else if (errorResponsed.status==401) {
            console.log('Login failed');
            this.isError=true;
          }
          else {
            console.log('Unknown login error: ' + errorResponsed.status);
          }
        }
      )

  }


}
