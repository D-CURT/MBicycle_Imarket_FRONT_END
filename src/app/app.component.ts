import { Component, OnInit} from '@angular/core';
import { ProductGetterService } from './services/product-getter.service';
import {HttpWorksService} from './services/http-works.service';
import { CurrentRoleService } from './services/current-role.service';

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
     private getService: ProductGetterService,
     public httpService: HttpWorksService,
     public roles: CurrentRoleService
     ) {}

  ngOnInit() {
    console.log('initialize');
    this.httpService.getCategoriesGroups().subscribe(data => {
      this.categories = data;
    });
   }

  pushGroupName() {
    this.getService.groupName = this.targetGroup;
    this.path = !this.path;
    console.log('push method end');
  }
}


