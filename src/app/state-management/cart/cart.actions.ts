import {CartModel} from '../../models/Cart/cart.model';
import {OrderDto} from '../../commons/public-dto/order.dto';
import {CreatePaymentDto} from '../../commons/public-dto/create-payment.dto';
import {RemoveCartItem} from '../../commons/interfaces/remove-cart-item.interface';

export interface CartStateModel {
  cart: CartModel;
}

export namespace CartActions {

  export class FetchUserCart {
    static readonly type = '[Cart] Fetch User Cart';

    constructor() {
    }
  }

  export class ClearCartContent {
    static readonly type = '[Cart] Clear Cart Content';

    constructor() {
    }
  }

  export class CreateUserCart {
    static readonly type = '[Cart] Create User Cart';

    constructor() {
    }
  }

  export class CheckoutOnCart {
    static readonly type = '[Cart] Checkout On Cart';

    constructor(public payload: {
      createOrderDto: OrderDto,
      createPaymentDto: CreatePaymentDto
    }) {
    }
  }

  export class RemoveProductsFromCart {
    static readonly type = '[Cart] Remove Products From Cart';

    constructor(public payload: { cartProducts: RemoveCartItem[] }) {
    }
  }

  export class CheckoutOnSingleProduct {
    static readonly type = '[Cart] Checkout On Single Product';

    constructor(public cartProductId: number,
                public payload: {
                  createOrderDto: OrderDto,
                  createPaymentDto: CreatePaymentDto
                }) {
    }
  }

  export class ClearCartFromStorage {
    static readonly type = '[Cart] Clear Cart From Storage';

    constructor() {
    }
  }
}
