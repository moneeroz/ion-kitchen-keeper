import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Iuser } from 'src/app/interfaces/iuser';

export const RegisterActions = createActionGroup({
  source: 'Register',
  events: {
    'Register request': props<{
      credntials: Iuser;
    }>(),
    'Register success': emptyProps(),
    'Register failure': props<{ error: string }>(),
  },
});
