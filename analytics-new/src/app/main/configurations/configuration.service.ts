/**
 * Created by triloq on 9/1/19.
 */
import { Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonHelper} from '../../common/common.helper';

@Injectable()
export class ConfigurationService {
    commonHelper: CommonHelper;
    constructor(private http: Http) {
        this.commonHelper = new CommonHelper();
    }

    getConfig():Observable<any> {

    let url ='http://0.0.0.0:5000/list_configs';
    return this.http.get(url).map(res => {
    return res.json().payload;
}).pipe(catchError(
    this.commonHelper.handleError('get events', [])));

}

}