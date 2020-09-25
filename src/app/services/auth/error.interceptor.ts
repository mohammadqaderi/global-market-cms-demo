import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable, of, Subscription, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {GlobalDataService} from '../../shared/services/global-data.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private gdService: GlobalDataService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if ([401].indexOf(err.status) !== -1) {
          this.gdService.userLogout().subscribe(() => {
            this.router.navigate(['/auth/login']);
          });
        }
        const {error} = err;
        return throwError(error);
      })
    );
  }

}
