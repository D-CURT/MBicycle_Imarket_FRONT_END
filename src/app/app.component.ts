import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from './services/product-getter.service';
import {GlobalService} from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  path: boolean;
  targetGroup: string;
  categories: any;

  constructor(
     private httpService: HttpClient,
     private getService: ProductGetterService,
     private global: GlobalService
     ) {}

  ngOnInit() {
    this.httpService.get('/categories/allCategoriesSortedByName').subscribe(data => {
      this.categories = data;
    });
   }

  pushGroupName() {
    this.getService.groupName = this.targetGroup;
    this.path = !this.path;
    console.log('push method end');
  }
}


