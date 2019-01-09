import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit {
  coupons: any;
  output: string[];
 constructor(
   private http: HttpClient,
   private router: Router
  ) { }
  
ngOnInit() {
    this.output = [];
    this.http.get('/coupons/getAll').subscribe(data => {
      this.coupons = data;
    });
  }

  postDelete() {
    console.log('postdel');
    console.log(this.output);
    this.http.post('/coupons/deleteAll', this.output).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(["/coupons"]));
    });

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
