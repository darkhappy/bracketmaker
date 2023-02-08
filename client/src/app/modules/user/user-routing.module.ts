import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {SettingsComponent} from "@modules/user/pages/settings/settings.component";
import { UserSettingsComponent } from './components/forms/user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'yo',
    component: UserSettingsComponent
  }
];

export const userRoutes = RouterModule.forChild(routes);
