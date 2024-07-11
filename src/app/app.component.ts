import {Component, inject} from '@angular/core';
import {save} from "./auto.actions";
import {select, Store} from "@ngrx/store";
import {FormState} from "./reduces";
import {Form} from "./model/form.model";
import {Actions} from "@ngrx/effects";
import {AutoActions} from "./action-types";
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {KentekenCheck} from "rdw-kenteken-check";
import {AllType, Auto, AUTO, Motor, MOTOR, Scooter, SCOOTER, Vehicle} from "./model/auto.model";
import {getForm} from "./auto.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  fb = inject(FormBuilder);
  store = inject(Store<FormState>)
  actions$ = inject(Actions)

  selectedVehicle: Vehicle<Auto, Motor, Scooter> | any = {
    MOTOR
  };

  allAutos = [
    MOTOR,
    AUTO,
    SCOOTER,
  ];
  allTypes: AllType[] = ['Auto', 'Motor', 'Scooter'];

  form = this.fb.group({
    type: [''],
    subtype: [''],
    licensePlate: ['', {
      validators: [Validators.required],
      asyncValidators: [this.validateLicensePlate()],
      updateOn: 'blur'
    }],
    image: [''],
  })

  // type
  get type(): string {
    return <string>this.form.get('type')!.value;
  }

  set type(value: string) {
    this.form.patchValue({type: value});
  }

  // subtype
  get subtype(): string {
    return <string>this.form.get('subtype')!.value;
  }

  set subtype(value: string) {
    this.form.patchValue({subtype: value});
  }

  // licensePlate
  get licensePlate(): string {
    return <string>this.form.get('licensePlate')!.value;
  }

  set licensePlate(value: string) {
    this.form.patchValue({licensePlate: value});
  }

  // image
  get image(): string {
    return <string>this.form.get('image')!.value;
  }

  set image(value: string) {
    this.form.patchValue({image: value});
  }

  validateLicensePlate(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const kt2 = new KentekenCheck(<string>this.form.get('licensePlate')!.value);
      const isValid = kt2.formatLicense();
      // console.log(`🟢 isValid`, isValid);
      return of(isValid === 'XX-XX-XX' ? {invalidLicensePlate: true} : null);
    };
  }

  constructor() {
    // persist data from ls to store
    const form = localStorage.getItem('form');
    if (form) {
      this.store.dispatch(AutoActions.save({
        form: JSON.parse(form)
      }));
    }

    // populate the reactive form with data from the store and select the type of object
    this.store
    .pipe(
      select(getForm)
    )
    .subscribe((form: Form | undefined) => {

      if (form) {
        this.form.patchValue(form);
        this.selectedVehicle = this.allAutos.find(vehicle => vehicle.type === form.type)!;

      } else {
        // first time when entering the page
        this.form.patchValue({
          type: AUTO.type,
          subtype: AUTO.subtype[0],
          image: AUTO.image
        });
        this.selectedVehicle = AUTO;
      }
    });
  }

  save(event: Event) {
    event.preventDefault();
    const localForm = this.form.value as Form;
    this.store.dispatch(save({form: localForm}));
  }

  changeType(e: any) {
    this.type = e;

    if (e === 'Auto') {
      this.selectedVehicle = AUTO;
      this.subtype = AUTO.subtype[0];

    } else if (e === 'Motor') {
      this.selectedVehicle = MOTOR;
      this.subtype = MOTOR.subtype[0];

    } else if (e === 'Scooter') {
      this.selectedVehicle = SCOOTER;
      this.subtype = '';
    }

  }
}
