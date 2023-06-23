import { Action, createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { AuthActions } from './auth.actions';
import { IauthState } from './iauth-state';

export const initialState = AppInitialState.auth;

export const authReducer = createReducer(
  initialState,
  on(
    AuthActions.loginRequest,
    (state): IauthState => ({
      ...state,
      isLoggingIn: true,
      isLoggedIn: false,
      user: null,
      error: null,
    }),
  ),
  on(
    AuthActions.loginSuccess,
    (state, action): IauthState => ({
      ...state,
      isLoggingIn: false,
      isLoggedIn: true,
      user: action.user,
      error: null,
    }),
  ),
  on(
    AuthActions.loginFailure,
    (state, action): IauthState => ({
      ...state,
      isLoggingIn: false,
      isLoggedIn: false,
      user: null,
      error: action.error,
    }),
  ),
  on(
    AuthActions.recoverPassword,
    (state): IauthState => ({
      ...state,
      isRecoveringPassword: true,
      isRecoveredPassword: false,
      error: null,
    }),
  ),
  on(
    AuthActions.recoverPasswordSuccess,
    (state): IauthState => ({
      ...state,
      isRecoveringPassword: false,
      isRecoveredPassword: true,
      error: null,
    }),
  ),
  on(
    AuthActions.recoverPasswordFailure,
    (state, action): IauthState => ({
      ...state,
      isRecoveringPassword: false,
      isRecoveredPassword: false,
      error: action.error,
    }),
  ),
  on(
    AuthActions.logoutSuccess,
    (state): IauthState => ({
      ...state,
      isLoggingIn: false,
      isLoggedIn: false,
      user: null,
      error: null,
    }),
  ),
);

// export function reducer(state: IauthState | undefined, action: Action): any {
//   return authReducer(state, action);
// }
