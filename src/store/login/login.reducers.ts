import { createReducer, on } from '@ngrx/store';
import { IloginState } from './ilogin-state';
import {
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
} from './login.actions';
import { AppInitialState } from '../appInitialState';

const initialState: IloginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),
  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  }),
);

export function loginReducer(state: IloginState, action: any) {
  return reducer(state, action);
}
