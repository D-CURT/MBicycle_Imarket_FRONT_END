import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from './product-getter.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ololo';

  targetGroup: string;

  categories: any;

  logggg: string;


   constructor(
     private httpService: HttpClient,
     private getService: ProductGetterService
     ) {}

  ngOnInit() {
    this.httpService.get('/categories/allCategoriesSortedByName').subscribe(data=>{
      this.categories = data;
    })
  }

  pushGroupName() {
    this.getService.setGroupName(this.targetGroup);
  }
}


