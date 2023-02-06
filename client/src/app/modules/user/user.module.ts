import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import {userRoutes} from "./user-routing.module";

@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    HeaderComponent,
  ],
  imports: [
    userRoutes,
    CommonModule
  ]
})
export class UserModule { }
