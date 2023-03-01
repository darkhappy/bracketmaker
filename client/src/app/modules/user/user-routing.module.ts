import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {ViewUsersComponent} from "@modules/user/pages/view-users/view-users.component";

const routes: Routes = [
  {
    path: 'view',
    component: ViewUsersComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: ':username',
    component: ProfileComponent,
  },
];

export const userRoutes = RouterModule.forChild(routes);
