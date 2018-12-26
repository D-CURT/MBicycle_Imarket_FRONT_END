import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.css']
})
export class DogsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products: any;

  ngOnInit() {
    this.http.get('/products/allProductsWithGroupSortedByName/dogs').subscribe(data => {
      this.products = data;
    })
  }
}
