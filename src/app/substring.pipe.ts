import { Pipe, PipeTransform } from '@angular/core';

const maxLength = 80;
@Pipe({
  name: 'substring',
  standalone: true,
  pure: true,
})
export class SubstringPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string') return value.substring(0, maxLength);
    return '';
  }
}
