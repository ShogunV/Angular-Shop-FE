import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: any, input?: any): any {
    if (input) {
      return value.filter(function (el: any) {
        return (
          el.category.toLowerCase().indexOf(input.toLowerCase()) > -1 &&
          el.category.length === input.length
        );
      });
    }
    if (value.length === 0) {
      return [-1];
    }
    return value;
  }
}
