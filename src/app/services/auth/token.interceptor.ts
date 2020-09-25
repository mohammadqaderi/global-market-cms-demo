import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GlobalDataService} from '../../shared/services/global-data.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private gdService: GlobalDataService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.gdService.Token();
    if (token) {
      const tokenReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(tokenReq);
    }
    return next.handle(request);
  }
}
