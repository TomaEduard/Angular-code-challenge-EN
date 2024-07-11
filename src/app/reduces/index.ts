import {isDevMode} from '@angular/core';
import {createReducer, MetaReducer, on} from '@ngrx/store';
import {AutoActions} from "../action-types";
import {Form} from "../model/form.model";

export const autoFeatureKey = 'auto';

export interface FormState {
  form: Form | undefined;
}

export const initialState: FormState = {
  form: undefined
};

export const autoReducer = createReducer(
  initialState,

  on(AutoActions.save, (state, action) => {
    return {
      form: action.form
    };
  }),

);

export const metaReducers: MetaReducer<FormState>[] = isDevMode() ? [] : [];


