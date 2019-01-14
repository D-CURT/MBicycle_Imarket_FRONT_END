import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import { CartService } from '../services/cart.service';
import {CurrentRoleService} from '../services/current-role.service';
import {HttpWorksService} from '../services/http-works.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  products: string[] = [];
  store = 'может быть и есть';

  constructor(
    private getService: ProductGetterService,
    private cartService: CartService,
    public roles: CurrentRoleService,
    private httpService: HttpWorksService
    ) { }

  ngOnInit() {
    this.product = this.getService.product;
    if (this.product.storeStatus) {
      this.store = 'est on sklad';
    } else {
      this.store = 'net takoi tovar';
    }
  }

  addingToCart() {
    this.products = [];
    this.products.push(this.getService.product.id)
    this.httpService.addToCart(this.products);
  }

  onEditProductClick() {
    this.getService.product = this.product;
    this.getService.manage_editMode = true;
  }

}
