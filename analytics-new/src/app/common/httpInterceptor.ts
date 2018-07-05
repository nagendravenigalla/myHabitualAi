import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
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

    return next.handle(hreq)
    

  }
}