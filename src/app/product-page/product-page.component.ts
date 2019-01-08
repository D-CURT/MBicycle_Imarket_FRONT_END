import { Component, OnInit } from '@angular/core';
import { ProductGetterService } from '../services/product-getter.service';
import { CartService } from '../services/cart.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {GlobalService} from '../services/global.service';
import {CurrentRoleService} from '../services/current-role.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: any;
  productsss: string[] = [];
  store = 'может быть и есть';

  constructor(
    private getService: ProductGetterService,
    private cartService: CartService,
    private http: HttpClient,
    private global: GlobalService,
    public roles: CurrentRoleService,
    private router: Router
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
    this.productsss.push(this.getService.product.id)
    const body = {productsIds: this.productsss}
    this.cartService.addProduct(this.getService.product.id);
    this.http.post('/orders/add', body).subscribe(
      (res: Response) => {
        console.log(res.status);
      }
    );
  }

  onEditProductClick() {
    this.getService.product = this.product;
    this.router.navigateByUrl("/manage");
  }

}
