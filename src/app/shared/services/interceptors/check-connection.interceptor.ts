import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {HelperService} from '../helper.service';
import {Router} from '@angular/router';

@Injectable()
export class CheckConnectionInterceptor implements HttpInterceptor {

  constructor(private helperService: HelperService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!window.navigator.onLine) {
      // if there is no internet, throw a HttpErrorResponse error
      // since an error is thrown, the function will terminate here
      const error = {
        status: 0,
        error: {
          description: 'Check Connectivity!'
        },
        statusText: 'Check Connectivity!'
      };
      this.helperService.setIsOnline(false);
      this.router.navigate(['/no-internet']);
      return throwError(new HttpErrorResponse(error));
    } else {
      // else return the normal request
      return next.handle(req);
    }
  }
}
