import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageProfileComponent implements OnInit {
  form: any = {};
 
  constructor(private http: HttpClient) { 
    this.form = {
      name: {},
      email: {},
      phone: {},
      address: {}
    }
  }

  ngOnInit() {
    //get profile from server and put it on form
    this.http.get('/profile/get').subscribe(
      data => {
        this.form = data;
        console.log('[Profile Got]');
      }
    )
  }

  submitUpdate() {
    //update profile on server
    this.http.post('/profile/update', this.form).subscribe(
      (resp: Response) => {
        console.log('[Profile Updated]: With code = ' + resp.status);
      }
    )
  }
}
