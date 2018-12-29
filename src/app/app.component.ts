import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ololo';
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
  
}


