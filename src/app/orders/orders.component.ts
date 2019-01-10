import { Component, OnInit } from '@angular/core';
import { CurrentRoleService } from '../services/current-role.service';
import { ProductGetterService } from '../services/product-getter.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private getService: ProductGetterService,
    public roles: CurrentRoleService
  ) { }

  dateTime : any;

  ngOnInit() {
  }

  send() {
    let date2Send = (document.getElementById("id_input_DateTimePicker") as HTMLInputElement).value;
    console.log( date2Send );
    this.http.post('/hey',date2Send).subscribe(data=>{console.log(data)})
  }

}
