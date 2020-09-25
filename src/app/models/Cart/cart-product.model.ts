import {AbstractProduct} from '../../commons/classes/abstract-product';
import {CartModel} from './cart.model';

export class CartProductModel extends AbstractProduct {
  image: string;

  cart: CartModel;

  totalPrice: number;

  cartId: number;

  productId: number;
}
