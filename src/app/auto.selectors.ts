import {createFeatureSelector, createSelector} from "@ngrx/store";
import {FormState} from "./reduces";

export const selectAutoState = createFeatureSelector<FormState>('auto');

export const getForm = createSelector(
  selectAutoState,
  formState => formState.form
);
