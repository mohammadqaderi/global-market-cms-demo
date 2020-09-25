import {Component, Input, OnInit} from '@angular/core';
import {OrderModel} from '../../../models/Orders/order.model';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {
  @Input() order: OrderModel;
  @Input() helperService: HelperService;
  @Input() gdService: GlobalDataService;

  constructor() {
  }

  ngOnInit(): void {
  }

  getOrderItemProduct(id: number) {
    if (this.gdService.Products) {
      const product = this.gdService.Products.find(p => p.id === id);
      return product;
    }
  }
}
