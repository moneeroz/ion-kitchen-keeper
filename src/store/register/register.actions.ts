import { createAction, props } from '@ngrx/store';
import { Iuser } from 'src/app/interfaces/iuser';

export const register = createAction(
  '[Register]',
  props<{ userData: Iuser }>(),
);

export const registerSuccess = createAction('[Register] success');

export const registerFail = createAction(
  '[Register] fail',
  props<{ error: any }>(),
);
