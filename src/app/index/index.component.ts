import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from '../services/product-getter.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private getService: ProductGetterService,
    private router: Router,
    ) { }

   products: any;
   item: any;

   checkBoxFilterApply: boolean;
   checkBoxStoreStatus: boolean;
   checkBoxWithDiscount: boolean;

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

    this.checkBoxFilterApply = false;
    this.checkBoxStoreStatus = true;
    this.checkBoxWithDiscount = false;

    this.http.get('/products/allProductsSortedByName').subscribe(data => {
      this.products = data;
    });
    
  }

  onAnyCheckboxChange() {

    if(this.checkBoxFilterApply==true) {

      if(this.checkBoxStoreStatus==false && this.checkBoxWithDiscount==false ) {
        this.http.get('/products/allProductsWithStoreStatusIsFalseAndDiscountIsNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if(this.checkBoxStoreStatus==true && this.checkBoxWithDiscount==false ) {
        this.http.get('/products/allProductsWithStoreStatusIsTrueAndDiscountIsNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if(this.checkBoxStoreStatus==false && this.checkBoxWithDiscount==true ) {
        this.http.get('/products/allProductsWithStoreStatusIsFalseAndDiscountIsNotNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if(this.checkBoxStoreStatus==true && this.checkBoxWithDiscount==true ) {
        this.http.get('/products/allProductsWithStoreStatusIsTrueAndDiscountIsNotNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

    }
    else {
      this.http.get('/products/allProductsSortedByName').subscribe(data => {
        this.products = data;
      });
    }

    this.router.navigateByUrl('/index', {skipLocationChange: true}).then(()=>this.router.navigate(["/index"])); //Костыль для перезагрузки данных
  }
  
  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }

}
