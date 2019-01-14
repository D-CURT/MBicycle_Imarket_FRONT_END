import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CurrentRoleService} from './current-role.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpWorksService {
  private host = 'http://localhost:8080';
  public isLogged: boolean;
  private items: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    public roles: CurrentRoleService
    ) { }
  public getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsSortedByName');
  }
  public getCategoriesGroups(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/categories/allCategoriesSortedByName');
  }
  public getSearchingProducts(searchString: string): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsSortedByNameWithNameLikeIgnoreCase/' + searchString);
  }
  public getProductsByGroup(groupName: string): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsWithGroupSortedByName/' + groupName);
  }
  public getWithoutDiscountWithoutStore(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsWithStoreStatusIsFalseAndDiscountIsNullOrderByName');
  }
  public getWithoutDiscountWithStore(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsWithStoreStatusIsTrueAndDiscountIsNullOrderByName');
  }
  public getWithDiscountWithoutStore(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsWithStoreStatusIsFalseAndDiscountIsNotNullOrderByName');
  }
  public getWithAll(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/products/allProductsWithStoreStatusIsTrueAndDiscountIsNotNullOrderByName');
  }
  public getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/coupons/getAll');
  }
  public getProductsInCart(): Observable<any[]> {
    return this.http.get<any[]>(this.host + '/orders/products');
  }
  public deleteCoupons(coupons: string[]) {
    this.http.post(this.host + '/coupons/deleteAll', coupons).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(['/coupon']));
    });
  }
  public deleteProductsFromCart(body: any) {
    this.http.post(this.host + '/orders/deleteProduct', body).subscribe((res: Response) => {
      console.log(res.status);
    });
  }
  public addToCart(products: any) {
    const body = {productsIds: products};
    this.http.post(this.host + '/orders/add', body).subscribe(
      (res: Response) => {
        console.log(res.status);
      }
    );
  }
  /* it will return bool; true - success, false - error */
  public registr(model: any): boolean {
    let returned: boolean;
    const options = {headers: {'Content-Type': 'application/json'}};
    this.http.post(this.host + '/registration', model, options)
      .subscribe(() => {
          console.log('[Registration] Point Entry IN res: response');
          this.isLogged = true;
          // this.setRole(model.username, model.password)
          (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 4000));
            this.router.navigateByUrl('/index');
          })();
          returned = true;
          },
        (error) => {
          const errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status === 409) {
            console.log('Registration failed. User with such username is already exists. Try another.');
            document.getElementById('errorText').innerText  = '   Registration failed. User ' +
              'with such username is already exists. Try another.';
            returned = false;
          } else {
            console.log('Unknown registration error: ' + errorResponsed.status);
          }
        });
    return returned;
  }
  public auth(model: any): boolean {
    let returned: boolean;
    const usr: string = model.username;
    const pas: string = model.password;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(usr + ':' + pas));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post( this.host + '/login', null, {headers: headers})
      .subscribe (
        (res: Response) => {
          console.log('[Login] Point Entry IN res: response');
        },
        (error) => {
          const errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status === 302) {
            console.log('Login Successfull');
            this.isLogged = true;
            this.setRole(usr, pas);
            (async () => {
              await new Promise((resolve) => setTimeout(() => resolve(), 2000));
              this.router.navigateByUrl('/index');
              console.log('router -> index');
            })();
            returned = false;
          } else if (errorResponsed.status === 401) {
            console.log('Login failed');
            returned = true;
          } else {
            console.log('Unknown login error: ' + errorResponsed.status);
          }
        }
      );
    return returned;
  }
  public logout(): boolean {
    let returned: boolean;
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
            returned = false;
          }
        }
      );
    return returned;
  }
  setRole(username: string, password: string) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    this.http.get(this.host + '/roles/currentRole', {headers: headers}).subscribe(data => {
      this.roles.setRoles(data[0].authority);
    });
  }
}
