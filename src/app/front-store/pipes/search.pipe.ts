import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, input?: any): any {
    if (input) {
      return value.filter(function (el: any) {
        return el.title.toLowerCase().indexOf(input.toLowerCase()) > -1;
      });
    }
    return value;
  }
}
