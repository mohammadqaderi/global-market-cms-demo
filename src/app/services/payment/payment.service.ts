import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {PaymentModel} from '../../models/Payments/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _http: HttpClient) {
  }

  getAllPayments(): Observable<PaymentModel[]> {
    return this._http.get<PaymentModel[]>(`${ApiEndpoints.PaymentEndpoints.rootPayments}/all`);
  }

  getUserPayments(): Observable<PaymentModel[]> {
    return this._http.get<PaymentModel[]>(`${ApiEndpoints.PaymentEndpoints.rootPayments}/user`);
  }

  getPaymentById(id: number): Observable<PaymentModel> {
    return this._http.get<PaymentModel>(`${ApiEndpoints.PaymentEndpoints.rootPayments}/${id}`);
  }
}
