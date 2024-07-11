import { Directive, forwardRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[appLicensePlateFormatter]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LicensePlateFormatterDirective),
    multi: true
  }]
})
export class LicensePlateFormatterDirective {

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, '').replace(/-/g, '').substring(0, 6);
    let formatted = '';
    let characters = value.split('');

    characters.forEach((char, index) => {
      formatted += char;
      if ((index + 1) % 2 === 0 && index + 1 < value.length) {
        formatted += '-';
      }
    });

    input.value = formatted;
  }
}
