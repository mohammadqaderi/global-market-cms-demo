import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {CartModel} from '../../models/Cart/cart.model';
import {RemoveCartItem} from '../../commons/interfaces/remove-cart-item.interface';
import {CheckoutReturnData} from '../../commons/interfaces/checkout-return-data';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _http: HttpClient) {
  }

  getUserCart(): Observable<CartModel> {
    return this._http.get<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/user-cart`);
  }

  createUserCart(): Observable<CartModel> {
    return this._http.post<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/create-user-cart`, null);
  }

  checkoutOnCart(payload: any): Observable<CheckoutReturnData> {
    return this._http.post<CheckoutReturnData>
    (`${ApiEndpoints.CartEndpoints.rootCart}/checkout-on-cart`, payload);
  }

  checkoutOnSingleProduct(cartProductId: number, payload: any): Observable<CheckoutReturnData> {
    return this._http.post<CheckoutReturnData>
    (`${ApiEndpoints.CartEndpoints.rootCart}/checkout-on-single-product/${cartProductId}`, payload);
  }

  clearCart(): Observable<CartModel> {
    return this._http.delete<CartModel>(`${ApiEndpoints.CartEndpoints.rootCart}/clear-cart`);
  }

  removeProductsFromCart(removedData: { cartProducts: RemoveCartItem[] }): Observable<CartModel> {
    return this._http
      .request<CartModel>('delete', `${ApiEndpoints.CartEndpoints.rootCart}/remove-products-from-cart`, {
        body: {
          removedData
        }
      });
  }

}
