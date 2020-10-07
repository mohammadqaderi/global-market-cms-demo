import {BillingAddress} from '../../commons/classes/billing-address';
import {OrderItemModel} from './order-item.model';
import {OrderStatus} from '../../commons/enums/order-status.enum';

export class OrderModel {
  id: number;

  status: OrderStatus;

  createdAt: Date;

  updatedAt: Date;

  comments: string;

  billingAddress: BillingAddress;

  shipmentDate: Date;

  orderItems: OrderItemModel[];

  userId: number;

  invoiceId: number;
}
