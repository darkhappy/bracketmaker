import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { userRoutes } from "./user-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import { MatTabsModule } from "@angular/material/tabs";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
  ],
  imports: [
    userRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FontAwesomeModule,
    MatIconModule,
  ]
})
export class UserModule { }
