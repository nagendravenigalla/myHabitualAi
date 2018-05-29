import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'displayName'
})
export class FilterPipe implements PipeTransform {
  transform(searchText): any {
    if (isNaN(searchText)){
      return searchText.split('_').join(' ');
    }else{
      return searchText;
    }
  }

}
