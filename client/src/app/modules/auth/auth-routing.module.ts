import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "@modules/auth/pages/login/login.component";
import {RegisterComponent} from "@modules/auth/pages/register/register.component";
import {FormCreateAccountComponent} from "@modules/auth/form-create-account/form-create-account.component";

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
    path: 'testForm',
    component: FormCreateAccountComponent
  }
];

export const authRoutes = RouterModule.forChild(routes);
