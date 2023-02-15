import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import {userRoutes} from "./user-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { ChangePasswordComponent } from './components/forms/change-password/change-password.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileContentComponent } from './components/profile-content/profile-content.component';
import {MatTabsModule} from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { SettingsProfileComponent } from './components/settings-profile/settings-profile.component';
import { SettingsAccountComponent } from './components/settings-account/settings-account.component';
import { SettingsSecurityComponent } from './components/settings-security/settings-security.component';
import { ChangeUsernameComponent } from './components/forms/change-username/change-username.component';
import { MatDialogModule } from "@angular/material/dialog";
import { ChangeEmailComponent } from "@modules/user/components/forms/change-email/change-email-component";
import { ChangePasswordDialogComponent } from './components/forms/change-password-dialog/change-password-dialog.component';
import { ViewUsersCardComponent } from './components/view-users-card/view-users-card.component';
import { MatCardModule } from '@angular/material/card';
import { ViewUsersCardListComponent } from './components/view-users-card-list/view-users-card-list.component';
import { ViewUsersComponent } from './pages/view-users/view-users.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ProfileHeaderComponent,
    ProfileContentComponent,
    SettingsProfileComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    ChangeUsernameComponent,
    ChangeEmailComponent,
    ChangePasswordDialogComponent,
    ViewUsersCardComponent,
    ViewUsersCardListComponent,
    ViewUsersComponent,
  ],
  imports: [
    userRoutes,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatSelectModule,
  ],
})
export class UserModule { }
