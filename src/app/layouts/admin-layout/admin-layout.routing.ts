import {Routes} from '@angular/router';
import {DashboardComponent} from '../../pages/admin/dashboard/dashboard.component';
import {UserProfileComponent} from '../../pages/admin/user-profile/user-profile.component';
import {SettingsComponent} from '../../pages/admin/settings/settings.component';
import {UsersComponent} from '../../pages/admin/users/users.component';
import {NotificationsComponent} from '../../pages/admin/notifications/notifications.component';
export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'users', component: UsersComponent},
  {path: 'notifications', component: NotificationsComponent},
];
