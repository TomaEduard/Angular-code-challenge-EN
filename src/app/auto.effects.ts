import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AutoActions} from "./action-types";

@Injectable()
export class AutoEffects {

  login$ = createEffect(() =>
    this.actions$
    .pipe(
      ofType(AutoActions.save),
      tap(action => {
        localStorage.setItem('form', JSON.stringify(action.form));
        console.log(`🟢 Effects - save form to ls`,);
      })
    ), {dispatch: false}
  );

  constructor(private actions$: Actions,
              private router: Router
  ) {
  }


}
