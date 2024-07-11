import {createAction, props} from "@ngrx/store";
import {Form} from "./model/form.model";

export const save = createAction(
  '[Auto Page] Save Form',
  props<{ form: Form }>()
);

