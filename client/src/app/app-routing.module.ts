import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentLayoutComponent} from "./layout/content-layout/content-layout.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'tournaments',
        loadChildren: () => {
          return import('@modules/tournaments/tournaments.module').then(m => m.TournamentsModule);
        }
      },
      {
        path: 'home',
        loadChildren: () => {
          return import('@modules/home/home.module').then(m => m.HomeModule);
        }
      },
      {
        path: 'user',
        loadChildren: () => {
          return import('@modules/user/user.module').then(m => m.UserModule);
        }
      },
      {
        path: 'auth',
        loadChildren: () => {
          return import('@modules/auth/auth.module').then(m => m.AuthModule);
        }
      },
    ],
  },
  // Fallback
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
