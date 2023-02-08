import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import {userRoutes} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';
import { UserSettingsComponent } from './components/forms/user-settings/user-settings.component';
@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    ProfileHeaderComponent,
    ChangePasswordComponent,
    UserSettingsComponent,
  ],
  imports: [
    userRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class UserModule { }
