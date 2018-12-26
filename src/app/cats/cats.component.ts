import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products: any;

  ngOnInit() {
    this.http.get('/products/allProductsWithGroupSortedByName/cats').subscribe(data => {
      this.products = data;
    })
  }

}
