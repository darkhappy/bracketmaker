import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {SettingsComponent} from "@modules/user/pages/settings/settings.component";
import {IsAuthenticatedGuard} from "@app/guard/is-authenticated-guard.service";

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [IsAuthenticatedGuard],
  }
];

export const userRoutes = RouterModule.forChild(routes);
