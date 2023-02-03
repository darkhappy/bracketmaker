import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeLayoutComponent} from "./layout/home-layout/home-layout.component";

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => {
      return import('@modules/user/user.module').then(m => m.UserModule);
    }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
    loadChildren: () => {
      return import('@modules/home/home.module').then(m => m.HomeModule);
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
