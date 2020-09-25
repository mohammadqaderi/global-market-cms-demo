import {OrderModel} from '../../models/Orders/order.model';
import {InvoiceModel} from '../../models/Invoice/invoice.model';
import {PaymentModel} from '../../models/Payments/payment.model';
import {CartModel} from '../../models/Cart/cart.model';

export interface CheckoutReturnData {
  order: OrderModel;
  invoice: InvoiceModel;
  payment: PaymentModel;
  cart?: CartModel;
}
