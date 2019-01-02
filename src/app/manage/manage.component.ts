import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  form: any = {};
  files: any;

  categories = [
    {
      name: 'first',
      groups: [{name: '1'}, {name: '2'}, {name: '1'}]
    },
    {
      name: 'second',
      groups: [{name: '6'}, {name: '6'}, {name: '6'}]
    }
  ]
  items: any;

  constructor(private http: HttpClient) { 
 }

  ngOnInit() {
  }

  addImage(event) {
    let target = event.target || event.srcElement;
    this.files = target.files;
  }

  submitRegister() {
    let final_data;
    if (this.files) {
        let files: FileList = this.files;
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
    })
  }
}
