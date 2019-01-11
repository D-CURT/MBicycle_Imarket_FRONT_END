import { Component, OnInit } from '@angular/core';
import {HttpWorksService} from '../services/http-works.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons: any;
  output: string[] = [];
  removableCoupons: string[];
  customs: any;
  model: any = {};

  constructor(
   private httpService: HttpWorksService,
   private http: HttpClient,
   private router: Router
  ) { }

  ngOnInit() {
    this.httpService.getCoupons().subscribe(data => {
      this.coupons = data;
    });

    this.http.get('/profiles/customers').subscribe(data => {
      this.customs = data;
    });
  }


  onSubmitAddCupon(){

    console.log(this.model.description);
    console.log(this.model.sum);

    const couponDTO = {
      description: this.model.description,
      sum: this.model.sum,
    }

    this.http.post('/coupons/add', couponDTO).subscribe(data => {
      console.log(couponDTO);
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/coupon"]));
    });
  }



  postDelete() {
    console.log('postdel');
    console.log(this.output);
    this.httpService.deleteCoupons(this.output);
    //this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/coupon"]));
    console.log('end post del');
  }

  updateOutput(event) {
    console.log('event!');
    if (event.checked) {
      console.log('push!');
      this.removableCoupons.push(event.source.name);
    } else {
      console.log('else!');
      this.removableCoupons.splice(this.removableCoupons.indexOf(event.source.name), 1);
    }
  }


}
