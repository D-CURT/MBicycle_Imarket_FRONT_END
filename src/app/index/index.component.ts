import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient) { }

   products: any;

  ngOnInit() {
    this.http.get('/products/allProductsSortedByName').subscribe(data => {
      this.products = data;
    });
  }

}
