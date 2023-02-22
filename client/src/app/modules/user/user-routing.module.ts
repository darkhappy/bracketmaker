import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {SettingsComponent} from "@modules/user/pages/settings/settings.component";
import {IsAuthenticatedGuard} from "@app/guard/is-authenticated-guard.service";
import {ViewUsersComponent} from "@modules/user/pages/view-users/view-users.component";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [IsAuthenticatedGuard],
  },
  {
    path: 'view',
    component: ViewUsersComponent,
  }
];

export const userRoutes = RouterModule.forChild(routes);
