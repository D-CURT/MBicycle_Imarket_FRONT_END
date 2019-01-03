import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  imageStatusSrc : String;
  imageStatusAlt : String;

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    
    this.messageAfterUpdate = '   @';
    this.isUpdated = false;
    this.isShow = false;
    this.imageStatusSrc = 'assets/images/accept1.png';
    this.imageStatusAlt = '123';
    
    this.http.get('/profiles/get').subscribe(
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

  doUpdate() {
    return new Promise((resolve, reject) => {
      this.http.post('/profiles/update', this.form).subscribe(
        (resp: Response) => {
          console.log('[Profile Update]: Profile updated.' );
          this.messageAfterUpdate = '   Profile updated.';
          this.isUpdated = true;
          resolve();
        },
        (error) => {
          let errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status +' (' + errorResponsed.statusText + ')');
          if (errorResponsed.status==204) {
            console.log('[Profile Update] Update failed = Server Internal Error');
            this.messageAfterUpdate = '   Update failed = Server Internal Error';
            this.isUpdated=false;
          }
          else {
            console.log('[Profile Update] Update failed = Unknown reason');
            this.messageAfterUpdate = '   Update failed = Unknown reason';
            this.isUpdated=false;
          }
          reject(error);
        }
      );
    });
  }
  
  submitUpdate() {
    this.innerUnpdate();
  }

  async innerUnpdate() {
    try {
      let promise = await this.doUpdate();
    } catch(e) {
      
    }
    
    this.statusUpdate();
    let wait = async (time) => new Promise((resolve) => setTimeout(resolve, time));
    window.requestAnimationFrame(async () => {
      this.isShow = true;
      await wait(7000);
      this.isShow = false;
    });
  }

}
