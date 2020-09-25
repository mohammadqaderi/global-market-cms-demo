import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {UserProfileComponent} from '../../pages/admin/user-profile/user-profile.component';
import {DashboardComponent} from '../../pages/admin/dashboard/dashboard.component';
import {NotificationsComponent} from '../../pages/admin/notifications/notifications.component';
import {SettingsComponent} from '../../pages/admin/settings/settings.component';
import {UsersComponent} from '../../pages/admin/users/users.component';
import {SharedModule} from '../../shared/shared-global.module';
import {EditUsersRolesComponent} from '../../pages/admin/edit-users-roles/edit-users-roles.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    NotificationsComponent,
    SettingsComponent,
    UsersComponent,
    EditUsersRolesComponent
  ]
})

export class AdminLayoutModule {
}
