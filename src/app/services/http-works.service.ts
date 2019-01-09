import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpWorksService {
  private host = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
    private navBarComp: NavBarComponent
    ) { }

  public getCategoriesGroups() {
    this.http.get(this.host + '/categories/allCategoriesSortedByName').subscribe(data => {
      return data;
    });
  }
  public getSearchingProducts(searchString: string) {
    this.http.get(this.host + '/products/allProductsSortedByNameWithNameLikeIgnoreCase/' + searchString).subscribe(data => {
      return data;
    });
  }
  public getProductsByGroup(groupName: string) {
    this.http.get(this.host + '/products/allProductsWithGroupSortedByName/' + groupName).subscribe(data => {
      return data;
    });
  }
  public addToCart(products: any) {
    const body = {productsIds: products}
    this.http.post(this.host + '/orders/add', body).subscribe(
      (res: Response) => {
        console.log(res.status);
      }
    );
  }
  /* it will return bool; true - success, false - error */
  public registr(model: any) {
    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post(this.host + '/registration', model, options)
      .subscribe(() => {
          console.log('[Registration] Point Entry IN res: response');
          this.navBarComp.isLogged = true;
          (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 4000));
            this.router.navigateByUrl('/index');
          })();
          return true;
          },
        (error) => {
          const errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status === 409) {
            console.log('Registration failed. User with such username is already exists. Try another.');
            document.getElementById('errorText').innerText  = '   Registration failed. User with such username is already exists. Try another.';
            return false;
          } else {
            console.log('Unknown registration error: ' + errorResponsed.status);
          }
        });
  }
  public logout() {
    this.http.get(this.host + '/logout')
      .subscribe (
        (res: Response) => {
          console.log('[Logout] Some response: ' + res.text);
        },
        error => {
          const errorResponsed = error as Response;
          if (errorResponsed.url.endsWith('logoutdone')) {
            console.log('[Logout] Server Redirects, therefore logout is successfull.');
            this.router.navigateByUrl('/index');
            return false;
          }
        }
      );
  }
}
