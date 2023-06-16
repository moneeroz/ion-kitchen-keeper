import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, of, switchMap } from 'rxjs';
import { Iuser } from 'src/app/interfaces/iuser';
import { AuthService } from 'src/app/services/auth.service';
import { register, registerFail, registerSuccess } from './register.actions';

@Injectable()
export class RegisterEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(register),
      switchMap((payload: { userData: Iuser }) =>
        this.authService.register(payload.userData).pipe(
          map(() => registerSuccess()),
          catchError((error) => of(registerFail({ error }))),
        ),
      ),
    );
  });
}
