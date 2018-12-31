import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductGetterService } from './product-getter.service';
import { ProductsComponent } from './products/products.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ololo';

  targetGroup: string;

  categories: any = [
    {
      name: 'olo',
      groups: [{name: '111'}, {name: '222'}]
    },
    {
      name: 'ole',
      groups: [{name: '333'}, {name: '444'}]
    }
  ];

   constructor(
     private httpService: HttpClient,
     private getService: ProductGetterService,
     ) {}

  ngOnInit() {
    this.httpService.get('/categories/allCategoriesSortedByName').subscribe(data=>{
      this.categories = data;
    })
  
  }

  pushGroupName() {
    let products = new ProductsComponent(this.getService, this.httpService);
    products.setGroupName(this.targetGroup);
    products.reload();
    console.log("push method end");
  }
}


