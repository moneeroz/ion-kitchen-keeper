import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Irecipe } from 'src/app/interfaces/irecipe';

export const RecipesApiActions = createActionGroup({
  source: 'Recipes API',
  events: {
    'Get Recipes': emptyProps(),
    'Get Recipes success': props<{ recipes: ReadonlyArray<Irecipe> }>(),
    'Get Recipes failure': props<{ error: string }>(),
    'Get Recipes By Catagory': props<{
      recipes: ReadonlyArray<Irecipe>;
      category: string;
    }>(),
    'Get Recipe By Id': props<{
      recipe: Readonly<Irecipe>;
      recipeId: string;
    }>(),
    'Created New Recipe': props<{ recipe: Readonly<Irecipe> }>(),
  },
});
