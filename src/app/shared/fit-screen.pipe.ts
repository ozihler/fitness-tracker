import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fitScreen'
})
export class FitScreenPipe implements PipeTransform {

  private readonly maxNumberOfSigns = 6;

  transform(text: string): string {
    if (!this.exists(text) || !this.isLargerThanFitting(text)) {
      return text;
    }
    return this.removeTooLargePartOf(text) + "...";
  }

  private removeTooLargePartOf(text: string) {
    return text.substring(0, this.maxNumberOfSigns);
  }

  private isLargerThanFitting(text: string) {
    return text.length > this.maxNumberOfSigns;
  }

  private exists(text: string) {
    return !!text;
  }
}
