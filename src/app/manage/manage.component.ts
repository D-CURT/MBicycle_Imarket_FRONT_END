import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {GlobalService} from '../services/global.service';

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

  constructor(
    private http: HttpClient,
    private global: GlobalService
    ) {}

  ngOnInit() {
    this.http.get('/categories/allCategoriesSortedByName').subscribe(data => {
      this.categories = data;
    });
  }

  addImage(event) {
    const target = event.target || event.srcElement;
    this.files = target.files;
  }

  submitRegister() {
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
        //Если нет файла, то слать как обычный JSON
          final_data = this.form;
    }

    this.http.post('/products/add', final_data).subscribe(resp => {
      console.log('ueeeeeeeeee');
    });
  }
}
