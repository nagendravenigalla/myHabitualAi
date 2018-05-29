import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseConfig} from "../common/base.config";
import { CommonHelper} from "../common/common.helper";
import { CookieService } from 'ngx-cookie';


@Injectable()
export class MainService {
    private baseConfig: BaseConfig;
    private commonHelper: CommonHelper;


    constructor(private http: Http, private httpClient: HttpClient, private _cookie: CookieService) {
        this.baseConfig = new BaseConfig();
        this.commonHelper = new CommonHelper();
    }

    logOutOfPage(){
        const logoutObservable = new Observable((observer) => {
            this._cookie.removeAll();
            // observable execution
            observer.next("bla bla bla")
            observer.complete()
        });


        logoutObservable.subscribe(response => {
            window.location.href = this.baseConfig.logout();
        })


        /*return this.http.get(url).map(res => {
            return res.json();
        }).pipe(catchError(
            this.commonHelper.handleError('get events', [])));*/
    }

    goToProfilePage(){
        const url = this.baseConfig.goToProfile();
        window.location.href = url;
    }

    getUserInfo(){
        const url = 'http://10.10.1.203:8000/dashboard/user_management';
            return this.http.get(url).map(res => {
                return res.json();
            }).pipe(catchError(
                this.commonHelper.handleError('get user info', [])));
    }



}


