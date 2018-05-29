import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { CommonHelper} from '../../../common/common.helper';

@Injectable()
export class AttributeService {
  private baseUrl = 'http://10.10.1.201:8017/api/v1/';
  updateCategoryUrl = '';
  commonHelper: CommonHelper;

  constructor(private http: Http) {
    this.commonHelper = new CommonHelper();
  }

  editCategory(obj): Observable<any>{
      const url = this.baseUrl + this.updateCategoryUrl;
      return this.http.post(url, obj).map(res => {
          return res.json();
      }).pipe(catchError(
          this.commonHelper.handleError('edit categories', [])));
  }

}


