import { Component, OnInit } from '@angular/core';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons: any;
  output: string[] = [];

  constructor(
   private httpService: HttpWorksService
  ) { }

  ngOnInit() {
    this.httpService.getCoupons().subscribe(data => {
      this.coupons = data;
    });
  }

  postDelete() {
    console.log('postdel');
    console.log(this.output);
    this.httpService.deleteCoupons(this.output);
    console.log('end post del');
  }

  updateOutput(event) {
    console.log('event!');
    if (event.checked) {
      console.log('push!');
      this.output.push(event.source.name);
    } else {
      console.log('else!');
      this.output.splice(this.output.indexOf(event.source.name), 1);
    }
  }


}
