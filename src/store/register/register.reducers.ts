import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { IregisterState } from './iregister-state';
import { register, registerFail, registerSuccess } from './register.actions';

const initialState = AppInitialState.register;

const reducer = createReducer(
  initialState,
  on(register, (state): IregisterState => {
    return {
      ...state,
      error: null,
      isRegistered: false,
      isRegistering: true,
    };
  }),
  on(registerSuccess, (state) => {
    return {
      ...state,
      error: null,
      isRegistered: true,
      isRegistering: false,
    };
  }),
  on(registerFail, (state, action) => {
    return {
      ...state,
      error: action.error,
      isRegistered: false,
      isRegistering: false,
    };
  }),
);

export function registerReducer(state: IregisterState, action: any) {
  return reducer(state, action);
}
