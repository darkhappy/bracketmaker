import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  }
];

export const userRoutes = RouterModule.forChild(routes);
