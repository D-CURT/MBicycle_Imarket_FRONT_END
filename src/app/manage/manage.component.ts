import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import {GlobalService} from '../services/global.service';
import { ProductGetterService } from '../services/product-getter.service';
import { HttpWorksService } from '../services/http-works.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  form: any = {};
  files: any;
  group: string;

  // categories = [
  //   {
  //     name: 'first',
  //     groups: [{name: '1'}, {name: '2'}, {name: '1'}]
  //   },
  //   {
  //     name: 'second',
  //     groups: [{name: '6'}, {name: '6'}, {name: '6'}]
  //   }
  // ]

  categories: any;

  items: any;

  product: any;

  editMode: boolean;

  constructor(
    private getService: ProductGetterService,
    private http: HttpClient,
    private global: GlobalService,
    private httpService: HttpWorksService
    ) {
      this.editMode = false;
    }

  ngOnInit() {
    console.log('ngOnInit(), editMode = ' + this.editMode)
    this.editMode = this.getService.manage_editMode;
    if (this.editMode && this.getService.product.id != null) {
      this.product = this.getService.product;
      this.httpService.getProductById(this.getService.product.id).subscribe(data => {
        this.product = data;
        this.form.id = this.product.id;
        this.form.name = this.product.name;
        this.form.price = this.product.price;
        this.form.discount = this.product.discount;
        this.form.storeStatus = this.product.storeStatus;
        this.form.descriptionPreview = this.product.descriptionPreview;
        this.form.description = this.product.description;
      });
    } else {
      this.httpService.getCategoriesGroups().subscribe(data => {
        this.categories = data;
      });
    }

  }

  addImage(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  submitUpdate() {
    let final_data;
    if (this.files) {
        const files: FileList = this.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('photo', files[i]);
        }

        formData.append('data', JSON.stringify(this.form));
        final_data = formData;

    } else {
      const formData = new FormData();
      formData.append('data', JSON.stringify(this.form));
      final_data = formData;
    }

    if (this.editMode) {
      this.httpService.updateProduct(final_data).subscribe(resp => {
        console.log('[Product update response] ');
      });
    } else {
      this.httpService.addProduct(final_data).subscribe(resp => {
        console.log('[Product add response] ');
      });
    }


  }
}
