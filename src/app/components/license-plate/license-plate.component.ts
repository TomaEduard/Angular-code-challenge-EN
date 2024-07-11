import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-license-plate',
  templateUrl: './license-plate.component.html',
  styleUrls: ['./license-plate.component.css']
})
export class LicensePlateComponent {

  @Input() licensePlate: string = '';
  @Output() licensePlateChange = new EventEmitter<string>();
  @Input() licensePlate_error!: string;

  onLicensePlateChanged(event: Event) {
    // Cast the event target to HTMLInputElement to access the value property
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;
    // console.log(`🔵 onLicensePlateChange`, newValue);
    this.licensePlate = newValue;
    this.licensePlateChange.emit(newValue);
  }
}
