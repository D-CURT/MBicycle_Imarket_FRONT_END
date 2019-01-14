import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {GlobalService} from '../services/global.service';
import { HttpWorksService } from '../services/http-works.service';

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css']
})
export class ManageProfileComponent implements OnInit {

  form: any = {};

  isUpdated: boolean;
  messageAfterUpdate: any;
  isShow: boolean;
  imageStatusSrc: String;
  imageStatusAlt: String;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private httpService: HttpWorksService
    ) {}

  ngOnInit() {
    
    this.messageAfterUpdate = '   @';
    this.isUpdated = false;
    this.isShow = false;
    this.imageStatusSrc = 'assets/images/accept1.png';
    this.imageStatusAlt = '123';
    
    this.httpService.getProfile().subscribe(
      data => {
        this.form = data;
        console.log('[Profile Get]: Successfull');
      }
    )
  }

  statusUpdate() {    
    if(this.isUpdated) {
      this.imageStatusSrc = 'assets/images/accept1.png';
      this.imageStatusAlt = 'update_success';
    }
    else  {
      this.imageStatusSrc = 'assets/images/error1.png';
      this.imageStatusAlt = ' update_failed';
    }
  }

  submitUpdate() {
    this.innerUpdate();
  }

  async innerUpdate() {
    try {

      let promise = await this.httpService.updateProfile(this.form).then(() => {
        this.messageAfterUpdate = '   Profile updated.';
        this.isUpdated = true;
      })
      .catch(message => {
        this.messageAfterUpdate = message;
        this.isUpdated = false;
      });

    } catch(e) { }
    
    this.statusUpdate();
    let wait = async (time) => new Promise((resolve) => setTimeout(resolve, time));
    window.requestAnimationFrame(async () => {
      this.isShow = true;
      await wait(7000);
      this.isShow = false;
    });
  }

}
