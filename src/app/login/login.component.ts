import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
    let body = new HttpParams;
    body = body.set('username', this.model.username);
    body = body.set('password', this.model.password);
    this.http.post('/login', body, {responseType: 'arraybuffer'}).subscribe(data => {
      // login successful so redirect to return url      
      this.router.navigateByUrl("/index");
    });

  }
}
