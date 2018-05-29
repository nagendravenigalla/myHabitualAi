import { Observable} from 'rxjs/Observable';
import { of} from 'rxjs/observable/of';

export class CommonHelper{
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

  sortByProp(array: Array<any>, p) {
      return array.sort(function(a,b) {
          return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
      });
  };
}
