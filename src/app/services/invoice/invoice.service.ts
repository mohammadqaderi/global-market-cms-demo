import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceModel} from '../../models/Invoice/invoice.model';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _http: HttpClient) {
  }

  getAllInvoices(): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${ApiEndpoints.InvoiceEndpoints.rootInvoices}/all`);
  }

  getUserInvoices(): Observable<InvoiceModel[]> {
    return this._http.get<InvoiceModel[]>(`${ApiEndpoints.InvoiceEndpoints.rootInvoices}/user`);
  }

  getInvoiceById(id: number): Observable<InvoiceModel> {
    return this._http.get<InvoiceModel>(`${ApiEndpoints.InvoiceEndpoints.rootInvoices}/${id}`);
  }
}
