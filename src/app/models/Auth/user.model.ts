import {OrderModel} from '../Orders/order.model';
import {PaymentModel} from '../Payments/payment.model';
import {InvoiceModel} from '../Invoice/invoice.model';
import {UserRole} from '../../commons/enums/user-role.enum';

export class UserModel {
  id: number;

  username: string;

  password: string;

  email: string;

  claims: UserRole[];

  emailVerified: boolean;

  invoices: InvoiceModel[];

  payments: PaymentModel[];

  orders: OrderModel[];

  profileId: number;

  subscriberId: number;

  cartId: number;

  constructor(public adminId: number, public adminUsername: string, public isEmailVerified: boolean,
              protected adminEmail: string) {
  }
}
