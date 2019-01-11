import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import {CurrentRoleService} from '../services/current-role.service';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  model: any = {};
  coupons: any;
  removableCoupons: string[];
  customs: any;

 constructor(
   private http: HttpClient,
   private router: Router,
   public roleService: CurrentRoleService
  ) { }
  
ngOnInit() {
    this.removableCoupons = [];
    this.http.get('/coupons/getAll').subscribe(data => {
      this.coupons = data;
    });
    this.http.get('/profiles/customers').subscribe(data => {
      this.customs = data;
    });
  }


  onSubmitAddCupon(){

    console.log(this.model.description);
    console.log(this.model.sum);

    let couponDTO = {
      description:this.model.description,
      sum:this.model.sum,
    }

    this.http.post('/coupons/add', couponDTO).subscribe(data => {
      console.log(couponDTO);
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/coupon"]));
    });
  }



  postDelete() {
    console.log('postdel');
    console.log(this.removableCoupons);
    this.http.post('/coupons/deleteAll', this.removableCoupons).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/coupon"]));
    });

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
