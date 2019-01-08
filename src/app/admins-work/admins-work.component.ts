import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-admins-work',
  templateUrl: './admins-work.component.html',
  styleUrls: ['./admins-work.component.css']
})
export class AdminsWorkComponent implements OnInit {
  users: any;
  isDelete: boolean;
  options: any;
  roles = ['ADMIN', 'MANAGER', 'CUSTOMER'];
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.http.get(this.global.host + '/users/allUsersSortedByLogin').subscribe(data => {
      this.users = data;
    });
  }
  setCurrent(event) {
    const target = event.target;
    this.options = document.getElementsByClassName('option');
    for (let i = 0; i <= this.options; i++) {
      this.options[i].style.color = 'black';
    }
    target.style.color = 'red';
  }
  sendCurrent(user: any) {
    this.http.post(this.global.host + '/profiles/updateRole', user).subscribe();
  }
}
