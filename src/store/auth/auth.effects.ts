import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService
          .login(action.credentials.email, action.credentials.password)
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
        tap((action) =>
          localStorage.setItem('currentUser', JSON.stringify(action.user)),
        ),
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
        tap(async () => {
          const toast = await this.toastController.create({
            message: 'Logged out successfully!',
            duration: 2000,
            position: 'bottom',
            color: 'warning',
          });
          toast.present();
        }),
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
    private toastController: ToastController,
  ) {}
}
