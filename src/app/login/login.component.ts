import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  isLogged: boolean; 
  isError: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private getService: ProductGetterService
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
            this.isLogged=true;
            this.getService.isLogged = true;
            console.log(this.getService.isLogged);
            (async () => {  
              await new Promise((resolve) => setTimeout(() => resolve(), 2000));
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
