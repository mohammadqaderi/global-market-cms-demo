import {Routes} from '@angular/router';
import {InvoicesComponent} from '../../pages/invoice/invoices/invoices.component';
import {InvoiceDetailsComponent} from '../../pages/invoice/invoice-details/invoice-details.component';

export const InvoicesLayoutRoutes: Routes = [
  {
    path: 'invoices',
    component: InvoicesComponent
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent
  }
];
