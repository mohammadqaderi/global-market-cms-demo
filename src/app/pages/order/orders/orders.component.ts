import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {InvoiceActions} from '../../../state-management/invoice/invoice.actions';
import FetchAllInvoices = InvoiceActions.FetchAllInvoices;
import {OrderActions} from '../../../state-management/order/order.actions';
import FetchAllOrders = OrderActions.FetchAllOrders;
import {UserActions} from '../../../state-management/user/user.actions';
import FetchSystemUsers = UserActions.FetchSystemUsers;
import {OrderStatus} from '../../../commons/enums/order-status.enum';
import {ProductActions} from '../../../state-management/product/product.actions';
import FetchAllProducts = ProductActions.FetchAllProducts;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  delivered = OrderStatus.DELIVERED;
  shipped = OrderStatus.SHIPPED;
  processed = OrderStatus.PROCESSED;

  displayedColumns: string[] =
    [
      'id',
      'status',
      'createdAt',
      'updatedAt',
      'comments',
      'shipmentDate',
      'user',
      'actions'
    ];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(public helperService: HelperService,
              public gdService: GlobalDataService,
              public store: Store) {

    if (!gdService.Invoices) {
      this.store.dispatch(new FetchAllInvoices()).subscribe(() => {
      });
    }
    if (!gdService.Products) {
      this.store.dispatch(new FetchAllProducts()).subscribe(() => {
      });
    }
    if (!gdService.Users) {
      this.store.dispatch(new FetchSystemUsers()).subscribe(() => {
      });
    }
    if (!this.gdService.Orders) {
      this.helperService.showSpinner('Loading Orders...');
      this.store.dispatch(new FetchAllOrders()).subscribe(() => {
        this.refreshOrders();
        this.helperService.hideSpinner();
      });
    } else {
      this.refreshOrders();
    }
  }

  refreshOrders() {
    this.helperService.orderDataSource.data = this.Orders;
  }

  ngOnInit(): void {
    this.helperService.orderDataSource.paginator = this.paginator;
    this.helperService.orderDataSource.sort = this.sort;
  }


  get Orders() {
    return this.gdService.Orders;
  }

}
