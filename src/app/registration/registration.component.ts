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

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
  }

  register() {

    let tosend = this.model.login + this.model.password;

    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post('/registration', this.model, options).subscribe(
        data => console.info('%%%%' + JSON.stringify(data) + "%%%@")  //FIXME: Return something? React on it somehow?
    );

    // this.http.post<T>('/registration', JSON.stringify(data), options).subscribe(
    //   (t: T) => console.info(JSON.stringify(t))
    // );
  }

}
