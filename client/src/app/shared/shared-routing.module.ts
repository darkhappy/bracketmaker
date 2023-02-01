import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { NavHomeComponent } from './nav/nav-home/nav-home.component';

const routes: Routes = [
  {
    path: '/home',
    component: NavHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
