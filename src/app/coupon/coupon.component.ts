import { Component, OnInit } from '@angular/core';
import {HttpWorksService} from '../services/http-works.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {CurrentRoleService} from '../services/current-role.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons: any;
  removableCoupons: string[] = [];
  customs: any;
  model: any = {};

  constructor(
   private httpService: HttpWorksService,
   private http: HttpClient,
   private router: Router,
   public roles: CurrentRoleService
  ) { }

  ngOnInit() {
    this.httpService.getCoupons().subscribe(data => {
      this.coupons = data;
    });

    this.http.get('/profiles/customers').subscribe(data => {
      this.customs = data;
    });
  }


  onSubmitAddCupon() {

    console.log(this.model.description);
    console.log(this.model.sum);

    const couponDTO = {
      description: this.model.description,
      sum: this.model.sum,
    }

    this.httpService.addCoupon(couponDTO);
  }



  postDelete() {
    console.log('postdel');
    console.log(this.removableCoupons);
    this.httpService.deleteCoupons(this.removableCoupons);
  }

  updateCheckedCoupons(event) {
    console.log('event!');
    if (event.checked) {
      this.removableCoupons.push(event.source.name);
      console.log('pushed ' + event.source.name);
    } else {
      console.log('else!');
      this.removableCoupons.splice(this.removableCoupons.indexOf(event.source.name), 1);
    }
  }


}
