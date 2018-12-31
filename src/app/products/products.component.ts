import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [
    {
      name: 'ololo',
      price: '12123',
      storestatus: 'asdasd',
      descriptionPreviev: 'asdasdasd'
    },
    {
      name: 'ololo',
      price: '12123',
      storestatus: 'asdasd',
      descriptionPreviev: 'asdasdasd'
    }
  ];
  groupName: string;

  constructor(
    private getGroupName: ProductGetterService,
    private http: HttpClient,
    ) { }

  ngOnInit() {
  }

  reload() {
    console.log("reload method");  
    this.products = this.http.get('/products/allProductsWithGroupSortedByName/' + this.groupName).subscribe(data => {
      this.products = data;
      console.log("inside httpclient");
    }) 
    this.products = [
      {
        name: '111',
        price: '222',
        storestatus: 'asdasd',
        descriptionPreviev: 'asdasdasd'
      },
      {
        name: '222',
        price: '333',
        storestatus: 'asdasd',
        descriptionPreviev: 'asdasdasd'
      }
    ];

    console.log(this.products);
  }

  setGroupName(name: string) {
    this.groupName = name;
    console.log("group name setted");
  }
}
