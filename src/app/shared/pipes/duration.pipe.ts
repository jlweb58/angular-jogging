import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: string): string {
    return DurationPipe.formatDuration(value);
  }

  public static formatDuration(isoDuration: string): string {
    if (!isoDuration) return '';

    // Parse the PT19M57S format
    const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!matches) return '';

    const [_, hours, minutes, seconds] = matches;

    // Convert to numbers, defaulting to 0 if undefined
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;

    // Format with padding
    const pad = (n: number) => n.toString().padStart(2, '0');

    // If there are hours, show HH:MM:SS, otherwise just MM:SS
    return h > 0
      ? `${pad(h)}:${pad(m)}:${pad(s)}`
      : `${pad(m)}:${pad(s)}`;
  }

}
