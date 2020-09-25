import {Routes} from '@angular/router';
import {PaymentsComponent} from '../../pages/payment/payments/payments.component';
import {PaymentDetailsComponent} from '../../pages/payment/payment-details/payment-details.component';

export const PaymentsLayoutRoutes: Routes = [
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'payments/:id',
    component: PaymentDetailsComponent
  }
];
