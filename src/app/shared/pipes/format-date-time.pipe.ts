import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from 'luxon';

@Pipe({
  name: 'formatDateTime'
})
export class FormatDateTimePipe implements PipeTransform {

  transform(startTime: string, zoneId?: string): string {
    return zoneId
      ? DateTime.fromISO(startTime, { zone: zoneId }).toLocaleString(DateTime.DATETIME_SHORT)
      : DateTime.fromISO(startTime).toLocaleString(DateTime.DATETIME_SHORT);
  }

}
