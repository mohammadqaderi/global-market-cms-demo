import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PaymentsLayoutRoutes} from './payment-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {PaymentsComponent} from '../../pages/payment/payments/payments.component';


@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PaymentsLayoutRoutes)
  ]
})
export class PaymentLayoutModule {
}
