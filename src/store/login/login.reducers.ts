import { createReducer, on } from '@ngrx/store';
import { IloginState } from './ilogin-state';
import {
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccessful,
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
  on(recoverPasswordSuccessful, (currentState) => {
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
);

export function loginReducer(state: IloginState, action: any) {
  return reducer(state, action);
}
