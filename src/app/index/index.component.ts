import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductGetterService } from '../services/product-getter.service';
import { Router } from '@angular/router';
import {GlobalService} from '../services/global.service';
import {CurrentRoleService} from '../services/current-role.service';

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
    private global: GlobalService,
    public roles: CurrentRoleService
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
    this.http.get(this.global.host + '/products/allProductsSortedByName').subscribe(data => {
      this.products = data;
    });
  }

  goToManage() {
    this.getService.manage_editMode=false;
    this.router.navigateByUrl('/manage');
  }

  onAnyCheckboxChange() {

    if (this.checkBoxFilterApply === true) {

      if (this.checkBoxStoreStatus === false && this.checkBoxWithDiscount === false ) {
        this.http.get(this.global.host + '/products/allProductsWithStoreStatusIsFalseAndDiscountIsNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if (this.checkBoxStoreStatus === true && this.checkBoxWithDiscount === false ) {
        this.http.get(this.global.host + '/products/allProductsWithStoreStatusIsTrueAndDiscountIsNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if (this.checkBoxStoreStatus === false && this.checkBoxWithDiscount === true ) {
        this.http.get(this.global.host + '/products/allProductsWithStoreStatusIsFalseAndDiscountIsNotNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

      if (this.checkBoxStoreStatus === true && this.checkBoxWithDiscount === true ) {
        this.http.get(this.global.host + '/products/allProductsWithStoreStatusIsTrueAndDiscountIsNotNullOrderByName').subscribe(data => {
          this.products = data;
        });
      }

    } else {
      this.http.get(this.global.host + '/products/allProductsSortedByName').subscribe(data => {
        this.products = data;
      });
    }
    this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/index"])); //Костыль для перезагрузки данных
  }
  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }
  getRole() {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa( "admin:123"));
    this.http.get(this.global.host + '/roles/currentRole', {headers: headers}).subscribe(data => {
      this.roles.setRoles(data[0].authority);
    });
  }

}
