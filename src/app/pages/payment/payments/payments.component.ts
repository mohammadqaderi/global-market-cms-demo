import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {UserActions} from '../../../state-management/user/user.actions';
import FetchSystemUsers = UserActions.FetchSystemUsers;
import {PaymentActions} from '../../../state-management/payment/payment.actions';
import FetchAllPayments = PaymentActions.FetchAllPayments;

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  displayedColumns: string[] =
    [
      'id',
      'amount',
      'date',
      'paymentMethod',
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
    if (!gdService.Payments) {
      this.helperService.showSpinner('Loading Payments...');
      this.store.dispatch(new FetchAllPayments()).subscribe(() => {
        this.refreshPayments();
        this.helperService.hideSpinner();
      });
    } else {
      this.refreshPayments();
    }
  }

  refreshPayments() {
    this.helperService.paymentDataSource.data = this.Payments;
  }

  ngOnInit(): void {
    this.helperService.paymentDataSource.paginator = this.paginator;
    this.helperService.paymentDataSource.sort = this.sort;
  }

  get Payments() {
    return this.gdService.Payments;
  }
}
