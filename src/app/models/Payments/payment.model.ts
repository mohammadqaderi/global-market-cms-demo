import {PaymentMethod} from '../../commons/enums/payment-method.enum';

export class PaymentModel {
  id: number;

  date: Date;

  amount: number;

  paymentMethod: PaymentMethod;

  userId: number;

  invoiceId: number;
}
