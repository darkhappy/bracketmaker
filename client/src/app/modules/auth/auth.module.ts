import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterComponent} from "@modules/auth/pages/register/register.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './pages/login/login.component';
import {authRoutes} from "@modules/auth/auth-routing.module";
import {CoreModule} from "@app/core.module";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {MatCardModule} from "@angular/material/card";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
  ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        authRoutes,
        CoreModule,
        MatCardModule,
        FontAwesomeModule
    ]
})
export class AuthModule { }
