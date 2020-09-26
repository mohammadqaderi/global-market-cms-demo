import {Routes} from '@angular/router';

import {AuthLayoutComponent} from './auth-layout.component';
import {AdminAuthGuard} from '../../commons/guards/admin-auth.guard';
import {CreateProfileComponent} from '../../pages/auth/create-profile/create-profile.component';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {ResetPasswordComponent} from '../../pages/auth/reset-password/reset-password.component';
import {RegisterAdminComponent} from '../../pages/auth/register-admin/register-admin.component';

export const AuthLayoutRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register-admin', component: RegisterAdminComponent},

      {
        path: 'create-profile',
        component: CreateProfileComponent,
        canActivate: [AdminAuthGuard]
      },
      {
        path: 'reset-password/:newPasswordToken',
        component: ResetPasswordComponent,
      }
    ]
  }

];
