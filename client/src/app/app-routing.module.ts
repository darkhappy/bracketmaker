import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'tournaments',
        loadChildren: () => {
          return import('@modules/tournaments/tournaments.module').then(
            (m) => m.TournamentsModule
          );
        },
      },
      {
        path: 'home',
        loadChildren: () => {
          return import('@modules/home/home.module').then((m) => m.HomeModule);
        },
      },
      {
        path: 'user',
        loadChildren: () => {
          return import('@modules/user/user.module').then((m) => m.UserModule);
        },
      },
      {
        path: 'auth',
        loadChildren: () => {
          return import('@modules/auth/auth.module').then((m) => m.AuthModule);
        },
      },
      {
        path: 'auth/validate',
        loadChildren: () => {
          return import('@modules/auth/auth.module').then((m) => m.AuthModule);
        },
      },
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: 'tournament',
        loadChildren: () => {
          return import('@modules/tournaments/tournaments.module').then(
            (m) => m.TournamentsModule
          );
        },
      },
    ],
  },
  // Fallback
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
