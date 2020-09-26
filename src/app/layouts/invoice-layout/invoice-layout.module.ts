import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoicesComponent} from '../../pages/invoice/invoices/invoices.component';
import {RouterModule} from '@angular/router';
import {InvoicesLayoutRoutes} from './invoice-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(InvoicesLayoutRoutes)
  ]
})
export class InvoiceLayoutModule {
}
