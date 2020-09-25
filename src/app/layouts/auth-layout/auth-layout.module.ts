import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {CreateProfileComponent} from '../../pages/auth/create-profile/create-profile.component';
import {ResetPasswordComponent} from '../../pages/auth/reset-password/reset-password.component';
import {LoginComponent} from '../../pages/auth/login/login.component';
import {SharedModule} from '../../shared/shared-global.module';
import {RegisterAdminComponent} from '../../pages/auth/register-admin/register-admin.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    SharedModule,
  ],
  declarations: [
    LoginComponent,
    CreateProfileComponent,
    ResetPasswordComponent,
    RegisterAdminComponent
  ]
})
export class AuthLayoutModule {
}
