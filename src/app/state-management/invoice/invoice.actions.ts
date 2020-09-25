import {InvoiceModel} from '../../models/Invoice/invoice.model';

export interface InvoiceStateModel {
  invoices: InvoiceModel[];
}

export namespace InvoiceActions {
  export class FetchAllInvoices {
    static readonly type = '[Invoice] Fetch All Invoices';

    constructor() {
    }
  }

  export class FetchUserInvoices {
    static readonly type = '[Invoice] Fetch User Invoices';

    constructor() {
    }
  }

  export class FetchInvoiceById {
    static readonly type = '[Invoice] Fetch Invoice By Id';

    constructor(public id: number) {
    }
  }
  export class ClearInvoicesFromStorage {
    static readonly type = '[Invoice] Clear Invoices From Storage';

    constructor() {
    }
  }
}
