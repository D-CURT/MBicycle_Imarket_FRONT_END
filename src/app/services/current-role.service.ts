import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentRoleService {

  isAdmin: boolean;
  isCustomer: boolean;
  isManager: boolean;

  constructor() { }


  public setRoles(value: any) {
    switch (value) {
      case 'CUSTOMER':
        this.isCustomer = true;
        break;

      case 'ADMIN':
        this.isAdmin = true;
        break;

      case 'MANAGER':
        this.isManager = true;
        break;
    }
    console.log('this is login role ' + value);
  }
}
