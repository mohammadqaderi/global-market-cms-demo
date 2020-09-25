import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {tap} from 'rxjs/operators';
import {PaymentActions, PaymentStateModel} from './payment.actions';
import {PaymentService} from '../../services/payment/payment.service';
import FetchAllPayments = PaymentActions.FetchAllPayments;
import {PaymentModel} from '../../models/Payments/payment.model';
import FetchUserPayments = PaymentActions.FetchUserPayments;
import ClearPaymentsFromStorage = PaymentActions.ClearPaymentsFromStorage;


@State<PaymentStateModel>({
  name: 'payments',
  defaults: {
    payments: []
  }
})

@Injectable()
export class PaymentState {
  constructor(private paymentService: PaymentService) {
  }

  @Selector()
  static Payments(state: PaymentStateModel) {
    return state.payments;
  }

  @Action(FetchAllPayments)
  fetchAllPayments(ctx: StateContext<PaymentStateModel>, action: FetchAllPayments) {
    return this.paymentService.getAllPayments().pipe(
      tap((data: PaymentModel[]) => {
        ctx.setState({
          payments: data
        });
      })
    );
  }

  @Action(ClearPaymentsFromStorage)
  clearPaymentsFromStorage(ctx: StateContext<PaymentStateModel>, action: ClearPaymentsFromStorage) {
    ctx.setState({
      payments: null
    });
  }

  @Action(FetchUserPayments)
  fetchUserPayments(ctx: StateContext<PaymentStateModel>, action: FetchUserPayments) {
    return this.paymentService.getUserPayments().pipe(
      tap((data: PaymentModel[]) => {
        ctx.setState({
          payments: data
        });
      })
    );
  }
}
