import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { IregisterState } from './iregister-state';
import { RegisterActions } from './register.actions';

export const initialState = AppInitialState.register;

export const registerReducer = createReducer(
  initialState,
  on(
    RegisterActions.registerRequest,
    (state): IregisterState => ({
      ...state,
      isRegistered: false,
      isRegistering: true,
      error: null,
    }),
  ),
  on(
    RegisterActions.registerSuccess,
    (state): IregisterState => ({
      ...state,
      isRegistered: true,
      isRegistering: false,
      error: null,
    }),
  ),
  on(
    RegisterActions.registerFailure,
    (state, action): IregisterState => ({
      ...state,
      isRegistered: false,
      isRegistering: false,
      error: action.error,
    }),
  ),
);
