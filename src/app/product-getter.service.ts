import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductGetterService {

  products: any;
  groupName: string;

  constructor() { }

  setGroupName(groupName: string) {
    this.groupName = groupName;
  }
}
