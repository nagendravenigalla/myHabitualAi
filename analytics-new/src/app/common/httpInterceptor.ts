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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const hreq = request.clone({
      headers: request.headers.set('App-Language', 'it')
    });

    return next.handle(hreq)
    .do((ev: HttpEvent<any>) => {
      if (ev instanceof HttpResponse) {
        console.log('processing response', ev);
      }
    });;

  }
}