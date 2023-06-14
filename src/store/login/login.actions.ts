import { createAction, props } from '@ngrx/store';

export const recoverPassword = createAction('[Recover password]');
export const recoverPasswordSuccessful = createAction(
  '[Recover password] success',
);
export const recoverPasswordFail = createAction(
  '[Recover password ] fail',
  props<{ error: string }>(),
);
