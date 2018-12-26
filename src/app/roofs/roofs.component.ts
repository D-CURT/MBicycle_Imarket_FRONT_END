import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-roofs',
  templateUrl: './roofs.component.html',
  styleUrls: ['./roofs.component.css']
})
export class RoofsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  products: any;

  ngOnInit() {
    this.http.get('/products/allProductsWithGroupSortedByName/roofs').subscribe(data => {
      this.products = data;
    })
  }
}
