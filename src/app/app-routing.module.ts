import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ManageComponent } from './manage/manage.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

const routes: Routes = [
  {
  path: 'index',
  component: IndexComponent,
  data: { title: 'Our products' },
},
{ path: '',
  redirectTo: '/index',
  pathMatch: 'full'
},
{
  path: 'manage',
  component: ManageComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'products',
  component: ProductsComponent
},
{
  path: 'products_1',
  component: ProductsComponent
},
{
  path: 'registration',
  component: RegistrationComponent
},
{
  path: 'search',
  component: SearchComponent
},
{
  path: 'product',
  component: ProductPageComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'manage-profile',
  component: ManageProfileComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
