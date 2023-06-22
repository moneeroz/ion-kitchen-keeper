import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IcustomRecipe } from 'src/app/interfaces/icustom-recipe';
import { Iuser } from 'src/app/interfaces/iuser';

export const CustomRecipeActions = createActionGroup({
  source: 'CustomRecipe',
  events: {
    'Generate recipe request': props<{ prompt: string }>(),
    'Generate recipe success': props<{ recipe: IcustomRecipe }>(),
    'Generate recipe failure': props<{ error: string }>(),
  },
});
