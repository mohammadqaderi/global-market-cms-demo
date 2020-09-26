import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ErrorLayoutRoutes} from './error-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {NoInternetComponent} from '../../pages/error/no-internet/no-internet.component';


@NgModule({
  declarations: [NoInternetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ErrorLayoutRoutes),
    SharedModule
  ]
})
export class ErrorModule {
}
