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

  constructor(private httpService: HttpWorksService) { }

  ngOnInit() {}

  register() {
    this.isRegistred = this.httpService.registr(this.model);
  }

}
