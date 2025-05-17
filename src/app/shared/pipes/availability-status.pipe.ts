import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availabilityStatus',
  standalone: true
})
export class AvailabilityStatusPipe implements PipeTransform {
  transform(isAvailable: boolean): string {
    return isAvailable ? 'Available for Sale' : 'Sold Out';
  }
}