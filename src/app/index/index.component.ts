import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient) { }

   products = [
     {
       name: 'roof',
       price: '10',
       previev: 'the roof is on fire, burn motherfucker',
       storeStatus: 'est on sklad'
     }, {
       name: 'cat',
       price: '100',
       previev: 'good cat',
       storeStatus: 'est on sklad'
    }, {
       name: 'dog',
       price: '007',
       previev: 'bad dog',
       storeStatus: 'est on sklad'
    }
   ]

  ngOnInit() {
//    this.http.get('/index').subscribe(data => {
//      this.query = data;
//    });
  }

}
