import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "@modules/auth/pages/login/login.component";
import {RegisterComponent} from "@modules/auth/pages/register/register.component";
import {ForgotPasswordComponent} from "@modules/auth/pages/forgot-password/forgot-password.component";
import {ChangePasswordComponent} from "@modules/user/components/forms/change-password/change-password.component";
import {ValidateEmailComponent} from "@modules/auth/pages/validate-email/validate-email.component";
import {UsernameComponent} from "@modules/auth/pages/username/username.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'activate',
    component: ValidateEmailComponent,
  },
  {
    path: 'username',
    component: UsernameComponent,
  }
];

export const authRoutes = RouterModule.forChild(routes);
