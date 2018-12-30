import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model: any = {};

  isRegistred: boolean; 
  isError: boolean;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.isRegistred=false;
    this.isError=false;
  }

  register() {
    this.isRegistred=false;
    this.isError=false;

    let tosend = this.model.login + this.model.password;

    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('/registration', this.model, options)
      .subscribe(
      
        (res: Response) => {
          console.log('[Registration] Point Entry IN res: response');
          //if (res.status==200) {
            console.log('Registration Successfull');
            this.isRegistred=true;
            (async () => {  
              await new Promise((resolve) => setTimeout(() => resolve(), 4000));
              this.router.navigateByUrl("/index"); 
            })();
          //}
        },
        (error) => {
          let errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status==409) {
            console.log('Registration failed. User with such username is already exists. Try another.');
            document.getElementById("errorText").innerText  = "   Registration failed. User with such username is already exists. Try another.";
            this.isError=true;
          }
          else {
            console.log('Unknown registration error: ' + errorResponsed.status);
          }
        }
      )

  }

}
