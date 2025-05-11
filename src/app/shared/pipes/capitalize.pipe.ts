import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Convert to lowercase first, then capitalize first letter
    return value.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  }
}
