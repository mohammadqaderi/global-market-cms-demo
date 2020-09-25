import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {OrderService} from '../../services/order/order.service';
import {OrderActions, OrderStateModel} from './order.actions';
import FetchAllOrders = OrderActions.FetchAllOrders;
import {OrderModel} from '../../models/Orders/order.model';
import FetchUserOrders = OrderActions.FetchUserOrders;
import UpdateOrder = OrderActions.UpdateOrder;
import {patch, removeItem, updateItem} from '@ngxs/store/operators';
import CancelOrder = OrderActions.CancelOrder;
import ClearOrdersFromStorage = OrderActions.ClearOrdersFromStorage;


@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    orders: null
  }
})

@Injectable()
export class OrderState {
  constructor(private orderService: OrderService) {
  }

  @Selector()
  static Orders(state: OrderStateModel) {
    return state.orders;
  }

  @Action(FetchAllOrders)
  fetchAllInvoices(ctx: StateContext<OrderStateModel>, action: FetchAllOrders) {
    return this.orderService.getAllOrders().pipe(
      tap((data: OrderModel[]) => {
        ctx.setState({
          orders: data
        });
      })
    );
  }

  @Action(FetchUserOrders)
  fetchUserInvoices(ctx: StateContext<OrderStateModel>, action: FetchUserOrders) {
    return this.orderService.getUserOrders().pipe(
      tap((data: OrderModel[]) => {
        ctx.setState({
          orders: data
        });
      })
    );
  }

  @Action(UpdateOrder)
  updateOrder(ctx: StateContext<OrderStateModel>, action: UpdateOrder) {
    return this.orderService.updateOrder(action.id, action.updateOrderDto).pipe(
      tap((updatedOrder: OrderModel) => {
        ctx.setState(patch({
          orders: updateItem<OrderModel>(order => order.id === action.id, updatedOrder)
        }));
      })
    );
  }

  @Action(ClearOrdersFromStorage)
  clearOrdersFromStorage(ctx: StateContext<OrderStateModel>, action: ClearOrdersFromStorage) {
    ctx.setState({
      orders: null
    });
  }

  @Action(CancelOrder)
  cancelOrder(ctx: StateContext<OrderStateModel>, action: CancelOrder) {
    return this.orderService.cancelOrder(action.id).pipe(
      tap(() => {
        ctx.setState(patch({
          orders: removeItem<OrderModel>(order => order.id === action.id)
        }));
      })
    );
  }
}
