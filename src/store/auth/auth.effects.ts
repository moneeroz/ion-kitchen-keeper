import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService
          .login(action.credntials.email, action.credntials.password)
          .pipe(
            map((user) => AuthActions.loginSuccess({ user: user })),
            catchError((error) => of(AuthActions.loginFailure({ error }))),
          ),
      ),
    );
  });

  loginSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => this.router.navigateByUrl('recipes')),
      );
    },
    { dispatch: false },
  );

  logoutSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => localStorage.removeItem('currentUser')),
        tap(() => this.router.navigateByUrl('recipes')),
      );
    },
    { dispatch: false },
  );

  recoverPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.recoverPassword),
      exhaustMap((action: { email: string }) =>
        this.authService.recoverLoginDetails(action.email).pipe(
          map(() => AuthActions.recoverPasswordSuccess()),
          catchError((error) =>
            of(AuthActions.recoverPasswordFailure({ error })),
          ),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
