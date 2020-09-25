import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CartActions, CartStateModel} from './cart.actions';
import {CartService} from '../../services/cart/cart.service';
import FetchUserCart = CartActions.FetchUserCart;
import {tap} from 'rxjs/operators';
import {CartModel} from '../../models/Cart/cart.model';
import CreateUserCart = CartActions.CreateUserCart;
import ClearCartFromStorage = CartActions.ClearCartFromStorage;
import ClearCartContent = CartActions.ClearCartContent;
import CheckoutOnCart = CartActions.CheckoutOnCart;
import {CheckoutReturnData} from '../../commons/interfaces/checkout-return-data';
import CheckoutOnSingleProduct = CartActions.CheckoutOnSingleProduct;
import RemoveProductsFromCart = CartActions.RemoveProductsFromCart;


@State<CartStateModel>({
  name: 'cart',
  defaults: {
    cart: null
  }
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService) {
  }

  @Selector()
  static Cart(state: CartStateModel) {
    return state.cart;
  }

  @Action(FetchUserCart)
  fetchUserCart(ctx: StateContext<CartStateModel>, action: FetchUserCart) {
    return this.cartService.getUserCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
      })
    );
  }

  @Action(CreateUserCart)
  createUserCart(ctx: StateContext<CartStateModel>, action: CreateUserCart) {
    return this.cartService.createUserCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
      })
    );
  }

  @Action(ClearCartContent)
  clearCartContent(ctx: StateContext<CartStateModel>, action: ClearCartContent) {
    return this.cartService.clearCart().pipe(
      tap((cart: CartModel) => {
        ctx.setState({
          cart
        });
      })
    );
  }

  @Action(CheckoutOnCart)
  checkoutOnCart(ctx: StateContext<CartStateModel>, action: CheckoutOnCart) {
    return this.cartService.checkoutOnCart(action.payload).pipe(
      tap((data: CheckoutReturnData) => {
        const {order, cart, invoice, payment} = data;
        ctx.patchState({
          cart
        });
        // Rest of code will be implemented later
      })
    );
  }

  @Action(CheckoutOnSingleProduct)
  checkoutOnSingleProduct(ctx: StateContext<CartStateModel>, action: CheckoutOnSingleProduct) {
    return this.cartService.checkoutOnSingleProduct(action.cartProductId, action.payload).pipe(
      tap((data: CheckoutReturnData) => {
        const {order, cart, invoice, payment} = data;
        ctx.patchState({
          cart
        });
        // Rest of code will be implemented later
      })
    );
  }

  @Action(RemoveProductsFromCart)
  removeProductsFromCart(ctx: StateContext<CartStateModel>, action: RemoveProductsFromCart) {
    return this.cartService.removeProductsFromCart(action.payload).pipe(
      tap((cart: CartModel) => {
        ctx.patchState({
          cart
        });
      })
    );
  }

  @Action(ClearCartFromStorage)
  clearCartFromStorage(ctx: StateContext<CartStateModel>, action: ClearCartFromStorage) {
    ctx.setState({
      cart: null
    });
  }
}
