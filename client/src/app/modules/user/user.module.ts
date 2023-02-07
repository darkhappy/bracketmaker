import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HeaderComponent } from './components/header/header.component';
import {userRoutes} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';
@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    HeaderComponent,
    ChangePasswordComponent,
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
