import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentRoleService {

  role: string;

  constructor() { }

  
  public setRoles(value : any) {
    this.role = value;
    console.log('this is login role ' + this.role)
  }
  
}
