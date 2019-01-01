import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../product-getter.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private getService: ProductGetterService
    ) { }

   products: any;
   item: any;

   items = [
     {
       name: 'ololo',
       price: '100',
       descriptionPreview: 'no comment',
       id: '122',
       storeStatus: 'true',
       description: 'Цель всей заметки — рассказать что за устройства находятся на рынке, что в них можно достать и кому это может понадобиться'
     }
   ]

  ngOnInit() {

    this.http.get('/products/allProductsSortedByName').subscribe(data => {
      this.products = data;
    });
    
  }
  
  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }

}
