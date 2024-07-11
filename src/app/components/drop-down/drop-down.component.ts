import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {

  @Input() label!: string;
  @Input() options!: any[];

  @Input() value!: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log(`🔵 onChange`, selectElement.value);
    this.valueChange.emit(selectElement.value);
  }

}
