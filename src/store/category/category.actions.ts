import { createActionGroup, props } from '@ngrx/store';
import { Irecipe } from 'src/app/interfaces/irecipe';

export const CategoryActions = createActionGroup({
  source: 'Category',
  events: {
    'Get recipes by category request': props<{ category: string }>(),
    'Get recipes by category success': props<{ items: Irecipe[] }>(),
    'Get recipes by category failure': props<{ error: string }>(),
  },
});
