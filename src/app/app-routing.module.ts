import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RoofsComponent } from './roofs/roofs.component';
import { CatsComponent } from './cats/cats.component';
import { DogsComponent } from './dogs/dogs.component';

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
