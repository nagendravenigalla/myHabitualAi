import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { HabitualConfig} from './habitual.config';
import { CommonHelper} from '../../common/common.helper';


@Injectable()
export class RunHabitualService
{
  private getRunDataUrl = '';  // URL to web api
  private deleteRunDataUrl = '';  // URL to web api
  private getBasesUrl = '';
  private exportAsCSVUrl = '';
  habitualConfig: HabitualConfig;
  commonHelper: CommonHelper;
  constructor(private http: Http, private httpClient: HttpClient) {
    this.habitualConfig = new HabitualConfig();
    this.commonHelper = new CommonHelper();
    this.getRunDataUrl = this.habitualConfig.getUrl('tasks');
    this.getBasesUrl = this.habitualConfig.getUrl('userBases');
    this.exportAsCSVUrl = this.habitualConfig.getUrl('exportAsCSV');
  }

  getRunData (obj): Observable<any> {
    const url = this.getRunDataUrl+'?sort='+obj.sort+'&limit='+obj.limit+
        '&order='+obj.order+'&offset='+obj.offset;
    return this.http.get(url)
      .pipe(
        catchError(this.commonHelper.handleError('get run', []))
      );
  }

  getBases (): Observable<any> {
    return this.http.get(this.getBasesUrl)
      .pipe(
        catchError(this.commonHelper.handleError('get run', []))
      );
  }

  exportAsCSV(run): Observable<any>{
    const url = this.exportAsCSVUrl + run.serial_no;
    return this.http.get(url)
        .pipe(
            catchError(this.commonHelper.handleError('export as csv', {status: 500}))
        );
  }

  addRun (obj): Observable<any>{
    const url = 'http://10.10.1.159:8014/api/v3/tasks';
    return this.http.post(this.getRunDataUrl, obj)
      .pipe(
        catchError(this.commonHelper.handleError('add run', []))
      );
  }

  deleteRun(obj): Observable<any> {
    return this.http.delete(this.getRunDataUrl + '/' + obj.serialId)
      .pipe(
        catchError(this.commonHelper.handleError('delete run', []))
      );
  }
}
