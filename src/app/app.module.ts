import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { ManageComponent } from './manage/manage.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';

import { ProductPageComponent } from './product-page/product-page.component';
import { CartComponent } from './cart/cart.component';
import { CouponComponent } from './coupon/coupon.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ManageComponent,
    LoginComponent,
    NavBarComponent,
    RegistrationComponent,
    ProductsComponent,
    SearchComponent,
    ProductPageComponent,
    CartComponent,
    CouponComponent,
    ManageProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
