import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Iuser } from 'src/app/interfaces/iuser';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login request': props<{
      credntials: { email: string; password: string };
    }>(),
    'Login success': props<{ user: Readonly<Iuser> }>(),
    'Login failure': props<{ error: string }>(),
    'Set user': props<{ user: Readonly<Iuser> }>(),
    'Recover password': props<{ email: string }>(),
    'Logout success': emptyProps(),
    'Recover password success': emptyProps(),
    'Recover password failure': props<{ error: string }>(),
  },
});
