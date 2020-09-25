import {PaymentModel} from '../../models/Payments/payment.model';

export interface PaymentStateModel {
  payments: PaymentModel[];
}

export namespace PaymentActions {
  export class FetchAllPayments {
    static readonly type = '[Payment] Fetch All Payments';

    constructor() {
    }
  }

  export class FetchUserPayments {
    static readonly type = '[Payment] Fetch User Payments';

    constructor() {
    }
  }

  export class FetchPaymentById {
    static readonly type = '[Payment] Fetch Payment By Id';

    constructor(public id: number) {
    }
  }

  export class ClearPaymentsFromStorage {
    static readonly type = '[Payment] Clear Payments From Storage';

    constructor() {
    }
  }
}
