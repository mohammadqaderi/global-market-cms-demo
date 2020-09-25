import {Routes} from '@angular/router';
import {OrdersComponent} from '../../pages/order/orders/orders.component';
import {OrderDetailsComponent} from '../../pages/order/order-details/order-details.component';

export const OrdersLayoutRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent
  }
];
