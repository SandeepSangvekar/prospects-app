import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {

  transform(value: any[], key: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!value || !key) return value;

    return value.sort((a, b) => {
      const comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      return order === 'asc' ? comparison : -comparison;
    });
  }

}
