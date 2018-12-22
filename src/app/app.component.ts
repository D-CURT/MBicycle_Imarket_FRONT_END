import { Component, OnInit } from '@angular/core';
import { Group } from './entities/group';
import { Category } from './entities/category'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ololo';
  hide = true;
  groups: Group[]=[];
  categories: Category[]=[];

  isClick: boolean=false;

  noobs = [{
    name: 'sergai',
    childs: [{name: 'aaa'}, {name: 'ooo'}] 
  }, {
    name: 'xxx',
    childs: [{name: 'ahaha'}, {name: 'lol'}]
  },{
    name: 'xxx',
    childs: [{name: 'ahaha'}, {name: 'lol'}]
  },{
    name: 'xxx',
    childs: [{name: 'ahaha'}, {name: 'lol'}]
  }]

   constructor(private httpService: HttpClient) {}

  ngOnInit() {
    
  }

  toggle() {
    this.isClick = !this.isClick;
  }
  
}


