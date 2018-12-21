import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [  
  {
  path: 'index',
  component: IndexComponent,
  data: { title: 'Our products' }
},
{ path: '',
  redirectTo: '/index',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
