import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {HttpClientModule} from "@angular/common/http";
import { autoFeatureKey, autoReducer } from "./reduces";
import {AutoEffects} from "./auto.effects";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LicensePlateComponent } from './components/license-plate/license-plate.component';
import {LicensePlateFormatterDirective} from "./pipes/LicensePlateDirective";
import {DropDownComponent} from "./components/drop-down/drop-down.component";

@NgModule({
  declarations: [
    AppComponent,
    DropDownComponent,
    LicensePlateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    LicensePlateFormatterDirective,
    RouterModule.forRoot([]),
    StoreModule.forRoot({[autoFeatureKey]: autoReducer}),
    EntityDataModule.forRoot(entityConfig),
    EffectsModule.forRoot([AutoEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
