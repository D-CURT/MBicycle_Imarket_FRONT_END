import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import {GlobalService} from '../services/global.service';
import { ProductGetterService } from '../services/product-getter.service';

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
    private global: GlobalService
    ) {
      this.editMode = false;
    }

  ngOnInit() {

    this.product = this.getService.product;
    if (this.getService.product.id != null) {
      this.editMode = true;
      this.http.get('/products/getById/'+this.getService.product.id).subscribe(data => {
        this.product = data;
        this.form.id=this.product.id;
        this.form.name=this.product.name;
        this.form.price = this.product.price;
        this.form.discount=this.product.discount;
        this.form.storeStatus=this.product.storeStatus;
        this.form.descriptionPreview=this.product.descriptionPreview;
        this.form.description=this.product.description;
      });
    } else {
      this.editMode = false;
      this.http.get('/categories/allCategoriesSortedByName').subscribe(data => {
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
      formData.append('data',JSON.stringify(this.form));
      final_data = formData;
    }

    if(this.editMode) {
      this.http.post('/products/update', final_data).subscribe(resp => {
        console.log('[Product update response] ');
      });
    }
    else {
      this.http.post('/products/add', final_data).subscribe(resp => {
        console.log('[Product add response] ');
      });
    }


  }
}
