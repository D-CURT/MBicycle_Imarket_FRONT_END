import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductGetterService {

  products: any;
  groupName: string;
  isLogged: boolean;
  product: any;

  manage_editMode: boolean;

  constructor() { }

}
