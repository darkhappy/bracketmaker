import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "@modules/auth/pages/register/register.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './pages/login/login.component';
import {authRoutes} from "@modules/auth/auth-routing.module";
import { FormCreateAccountComponent } from './form-create-account/form-create-account.component';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    FormCreateAccountComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    authRoutes
  ]
})
export class AuthModule { }
