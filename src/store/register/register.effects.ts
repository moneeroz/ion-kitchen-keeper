import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, exhaustMap, map, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterActions } from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterActions.registerRequest),
      exhaustMap((action) =>
        this.authService.register(action.credentials).pipe(
          map(() => RegisterActions.registerSuccess()),
          catchError((error) => of(RegisterActions.registerFailure({ error }))),
        ),
      ),
    );
  });
}
