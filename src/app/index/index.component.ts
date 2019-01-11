import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import { Router } from '@angular/router';
import {CurrentRoleService} from '../services/current-role.service';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private getService: ProductGetterService,
    public roles: CurrentRoleService,
    public httpService: HttpWorksService,
    public router: Router
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
       description: 'Цель всей заметки — рассказать что за устройства находятс' +
         'я на рынке, что в них можно достать и кому это может понадобиться'
     }
   ]

  ngOnInit() {

    this.checkBoxFilterApply = false;
    this.checkBoxStoreStatus = true;
    this.checkBoxWithDiscount = false;
    this.httpService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }

  goToManage() {
    this.getService.manage_editMode = false;
  }

  onAnyCheckboxChange() {

    if (this.checkBoxFilterApply) {

      if (!this.checkBoxStoreStatus && !this.checkBoxWithDiscount) {
        this.httpService.getWithoutDiscountWithoutStore().subscribe(data => {
          this.products = data;
        });
      }

      if (this.checkBoxStoreStatus && !this.checkBoxWithDiscount) {
        this.httpService.getWithoutDiscountWithStore().subscribe(data => {
          this.products = data;
        });

      }

      if (!this.checkBoxStoreStatus && this.checkBoxWithDiscount) {
        this.httpService.getWithDiscountWithoutStore().subscribe(data => {
          this.products = data;
        });

      }

      if (this.checkBoxStoreStatus && this.checkBoxWithDiscount) {
        this.httpService.getWithAll().subscribe(data => {
          this.products = data;
        });
      }

    } else {
      this.httpService.getAllProducts().subscribe(data => {
        this.products = data;
      });
    }
    this.router.navigateByUrl('/index', {skipLocationChange: true})
      .then(() => this.router.navigate(['/index'])); // Костыль для перезагрузки данных
  }
  pushProductInfo() {
    this.getService.product = this.item;
    console.log('information about product has been sent');
  }
 }
