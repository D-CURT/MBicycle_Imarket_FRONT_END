import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SearchComponent } from '../search/search.component';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers : [NavBarComponent, SearchComponent]
})
export class RegistrationComponent implements OnInit {

  model: any = {};
  isRegistred: boolean;
  isError: boolean;

  constructor(private httpService: HttpWorksService) { }

  ngOnInit() {
  }

  register() {
    this.httpService.promisedRegistr(this.model).then(() => {
      this.isRegistred = true;
      this.isError = false;
    })
    .catch(err => {
      this.isRegistred = false;
      this.isError = true;
    });  
  }
  
}
