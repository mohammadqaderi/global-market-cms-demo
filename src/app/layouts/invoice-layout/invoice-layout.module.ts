import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from '../../pages/invoice/invoices/invoices.component';
import {InvoiceDetailsComponent} from '../../pages/invoice/invoice-details/invoice-details.component';
import {RouterModule} from '@angular/router';
import {InvoicesLayoutRoutes} from './invoice-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [InvoicesComponent, InvoiceDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(InvoicesLayoutRoutes)
  ]
})
export class InvoiceLayoutModule {
}
