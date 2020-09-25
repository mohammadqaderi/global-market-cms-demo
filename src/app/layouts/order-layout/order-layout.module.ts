import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from '../../pages/order/orders/orders.component';
import {OrderDetailsComponent} from '../../pages/order/order-details/order-details.component';
import {RouterModule} from '@angular/router';
import {OrdersLayoutRoutes} from './order-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {OrderItemsComponent} from '../../pages/order/order-items/order-items.component';


@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent, OrderItemsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(OrdersLayoutRoutes)
  ]
})
export class OrderLayoutModule {
}
