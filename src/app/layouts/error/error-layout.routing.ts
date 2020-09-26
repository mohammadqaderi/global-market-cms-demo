import {Routes} from '@angular/router';
import {NoInternetComponent} from '../../pages/error/no-internet/no-internet.component';

export const ErrorLayoutRoutes: Routes = [
  {
    path: 'no-internet',
    component: NoInternetComponent
  }
];
