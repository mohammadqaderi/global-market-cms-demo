import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrderModel} from '../../models/Orders/order.model';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {OrderDto} from '../../commons/public-dto/order.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private _http: HttpClient) {
  }

  getAllOrders(): Observable<OrderModel[]> {
    return this._http.get<OrderModel[]>(`${ApiEndpoints.OrderEndpoints.rootOrders}/all`);
  }

  getUserOrders(): Observable<OrderModel[]> {
    return this._http.get<OrderModel[]>(`${ApiEndpoints.OrderEndpoints.rootOrders}/user`);
  }

  updateOrder(id: number, data: OrderDto): Observable<OrderModel> {
    return this._http.put<OrderModel>(`${ApiEndpoints.OrderEndpoints.rootOrders}/${id}/update`, data);
  }

  cancelOrder(id: number): Observable<void> {
    return this._http.delete<void>(`${ApiEndpoints.OrderEndpoints.rootOrders}/${id}/cancel`);
  }

  getOrderById(id: number): Observable<OrderModel> {
    return this._http.get<OrderModel>(`${ApiEndpoints.OrderEndpoints.rootOrders}/${id}`);
  }
}
