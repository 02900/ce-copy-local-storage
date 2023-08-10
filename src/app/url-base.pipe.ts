import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlBase',
  standalone: true,
  pure: true,
})
export class UrlBasePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') return '';
    return new URL(value).host;
  }
}
