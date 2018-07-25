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
import { BaseConfig } from './base.config';

@Injectable()
export class HttpLogoutInterceptor implements HttpInterceptor {
    private baseConfig: BaseConfig;
    constructor(){
        this.baseConfig = new BaseConfig();
    }

   
  intercept(
    request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    let hreq = request.clone({
        setHeaders:{
          'authorization' : 'bearer'
        }
    });
    console.log(hreq);
      return next.handle(request).do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
           console.log('processing response',event);
          }
      }, (err: any) => {
          if (err instanceof HttpErrorResponse) {
              if (err.status === 302) {
                 const url = this.baseConfig.goToProfile();
                window.location.href = url;
                  
              }
          }
      });


  }
}
