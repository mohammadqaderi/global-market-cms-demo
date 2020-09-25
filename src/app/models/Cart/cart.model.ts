import {CartProductModel} from './cart-product.model';

export class CartModel {
  id: number;

  totalItems: number;

  cartProducts: CartProductModel[];
}
