import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from './services/product-getter.service';
import { ProductsComponent } from './products/products.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ololo';

  path: boolean=false;

  targetGroup: string;

  categories: any;

  roles: any;

   constructor(
     private httpService: HttpClient,
     private getService: ProductGetterService,
     ) {}

  ngOnInit() {
    this.httpService.get('/categories/allCategoriesSortedByName').subscribe(data=>{
      this.categories = data;
    })

    this.httpService.get('/roles/currentRole').subscribe(data=> {
      this.roles = data;
    })
 
  }

  pushGroupName() {
    this.getService.groupName = this.targetGroup;
    this.path = !this.path;
    console.log("push method end");
  }
}


