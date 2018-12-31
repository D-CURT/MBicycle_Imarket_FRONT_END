import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductGetterService {

  products: any;
  groupName: string;
  isLogged: boolean=false;

  constructor(
    private http: HttpClient
    ) { }

  setGroupName(groupName: string) {
    this.groupName = groupName;
  }

}
