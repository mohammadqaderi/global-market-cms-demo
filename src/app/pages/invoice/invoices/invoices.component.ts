import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {InvoiceActions} from '../../../state-management/invoice/invoice.actions';
import FetchAllInvoices = InvoiceActions.FetchAllInvoices;
import {UserActions} from '../../../state-management/user/user.actions';
import FetchSystemUsers = UserActions.FetchSystemUsers;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] =
    [
      'id',
      'total',
      'date',
      'dueDate',
      'paymentDate',
      'user'
    ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {
    if (!gdService.Users) {
      this.store.dispatch(new FetchSystemUsers()).subscribe(() => {
      });
    }
    if (!gdService.Invoices) {
      this.helperService.showSpinner('Loading Invoices...');
      this.store.dispatch(new FetchAllInvoices()).subscribe(() => {
        this.refreshInvoices();
        this.helperService.hideSpinner();
      });
    } else {
      this.refreshInvoices();
    }
  }

  refreshInvoices() {
    this.helperService.invoiceDataSource.data = this.Invoices;
  }

  ngOnInit(): void {
    this.helperService.invoiceDataSource.paginator = this.paginator;
    this.helperService.invoiceDataSource.sort = this.sort;
  }

  get Invoices() {
    return this.gdService.Invoices;
  }


}
