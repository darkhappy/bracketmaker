import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from "./pages/profile/profile.component";
import {SettingsComponent} from "@modules/user/pages/settings/settings.component";
import {IsAuthenticatedGuard} from "@app/guard/is-authenticated-guard.service";
import {ViewUsersCardComponent} from "@modules/user/components/view-users-card/view-users-card.component";
import { ViewUsersCardListComponent } from './components/view-users-card-list/view-users-card-list.component';

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
    component: ViewUsersCardListComponent,
  }
];

export const userRoutes = RouterModule.forChild(routes);
