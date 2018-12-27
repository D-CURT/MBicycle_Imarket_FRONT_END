import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RoofsComponent } from './roofs/roofs.component';
import { CatsComponent } from './cats/cats.component';
import { DogsComponent } from './dogs/dogs.component';
import { ManageComponent } from './manage/manage.component'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [  
  {
  path: 'index',
  component: IndexComponent,
  data: { title: 'Our products' }
},
{ path: '',
  redirectTo: '/index',
  pathMatch: 'full'
},
{
  path: 'roofs',
  component: RoofsComponent
},
{
  path: 'cats',
  component: CatsComponent
},
{
  path: 'dogs',
  component: DogsComponent
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
  path: 'registration',
  component: RegistrationComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, 
      { enableTracing: true } // <-- debugging purposes only
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
