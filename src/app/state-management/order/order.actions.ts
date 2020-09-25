import {OrderModel} from '../../models/Orders/order.model';
import {OrderDto} from '../../commons/public-dto/order.dto';

export interface OrderStateModel {
  orders: OrderModel[];
}

export namespace OrderActions {
  export class FetchAllOrders {
    static readonly type = '[Order] Fetch All Orders';

    constructor() {
    }
  }

  export class FetchUserOrders {
    static readonly type = '[Order] Fetch User Orders';

    constructor() {
    }
  }

  export class FetchOrderById {
    static readonly type = '[Order] Fetch Order By Id';

    constructor(public id: number) {
    }
  }

  export class UpdateOrder {
    static readonly type = '[Order] Update Order';

    constructor(public id: number, public updateOrderDto: OrderDto) {
    }
  }

  export class CancelOrder {
    static readonly type = '[Order] Cancel Order';

    constructor(public id: number) {
    }
  }

  export class ClearOrdersFromStorage {
    static readonly type = '[Order] Clear Orders From Storage';

    constructor() {
    }
  }
}
