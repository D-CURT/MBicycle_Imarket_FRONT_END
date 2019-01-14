import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {CurrentRoleService} from './current-role.service';
import {Observable} from 'rxjs';
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';
import { resolve } from 'url';
import { reject } from 'q';

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
      this.router.navigateByUrl('/index', {skipLocationChange: true}).then(() => this.router.navigate(['/coupons']));
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
  public promisedRegistr(model: any) {
    return new Promise((resolve, reject) => {
      const options = {headers: {'Content-Type': 'application/json'}};
      this.http.post(this.host + '/registration', model, options)
        .subscribe(() => {
          console.log('[Registration] Point Entry IN res: response');
          this.isLogged = true;
          // this.setRole(model.username, model.password)
          resolve();
          (async () => {
            await new Promise((resolve) => setTimeout(() => resolve(), 4000));
            this.router.navigateByUrl('/index');
          })();
          },
        (error) => {
          reject();
          const errorResponsed = error as Response;
          console.log('Error status (response) = ' + errorResponsed.status);
          if (errorResponsed.status === 409) {
            console.log('Registration failed. User with such username is already exists. Try another.');
            document.getElementById('errorText').innerText  = '   Registration failed. User ' +
              'with such username is already exists. Try another.';
          } else {
            console.log('Unknown registration error: ' + errorResponsed.status);
          }
        });
    });
  }
  promisedLogin(model: any) {
    return new Promise((resolve, reject) => {
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
              (async () => {  //Can be removed later
                resolve();
              })();
            } else if (errorResponsed.status === 401) {
              console.log('Login failed');
              return reject('Login failed');
            } else {
              console.log('Unknown login error: ' + errorResponsed.status);
              return reject('Unknown login error: ' + errorResponsed.status);
            }
          }
        );
        //seems, need to resolve() but no
    });
  }
  public promisedLogout() {
    return new Promise((resolve, reject) => {
      this.http.get(this.host + '/logout')
        .subscribe (
          (res: Response) => {
            console.log('[Logout] Some response: ' + res.text);
          },
          error => {
            const errorResponsed = error as Response;
            if (errorResponsed.url.endsWith('logoutdone')) {
              console.log('[Logout] Server Redirects, therefore logout is successfull.');

              this.isLogged = false;
              this.roles.isAdmin = false;
              this.roles.isCustomer = false;
              this.roles.isManager = false;

              this.router.navigateByUrl('/index');
              resolve();
            }
            else {
              reject();
            }
          }
        );
    });
  }
  setRole(username: string, password: string) {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
    this.http.get(this.host + '/roles/currentRole', {headers: headers}).subscribe(data => {
      this.roles.setRoles(data[0].authority);
    });
  }
}
