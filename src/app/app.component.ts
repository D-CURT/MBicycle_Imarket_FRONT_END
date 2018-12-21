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

  groups: Group[]=[];
  categories: Category[]=[];

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
    
    this.httpService.get('./ololo/ololo.json').subscribe((data: Group) => {
      this.groups = data['list'];
    });

    this.httpService.get('./ololo/nololo.json').subscribe((data:Category) => {
      this.categories = data['list']
    });
  }
}
