import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

@Injectable()
export class HttpLogoutInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {


    let hreq = request.clone({
        setHeaders:{
          'authorization' : 'bearer'
        }
    });

      return next.handle(request).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              // do stuff with response if you want
          }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 401) {
                  // redirect to the login route
                  // or show a modal
              }
          }
      });


  }
}
