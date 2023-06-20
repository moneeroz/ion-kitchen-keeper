import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Ifavourite } from 'src/app/interfaces/ifavourite';

export const FavouriteApiActions = createActionGroup({
  source: 'Recipes API',
  events: {
    'Get favourites request': emptyProps(),
    'Get favourites success': props<{ items: Ifavourite[] }>(),
    'Get favourite failure': props<{ error: string }>(),
    'Add to favourites request': props<{ recipeId: string }>(),
    'Add to favourites success': props<{ recipe: Ifavourite }>(),
    'Add to favourites failure': props<{ error: string }>(),
    'Remove from favourites request': props<{ recipeId: string }>(),
    'Remove from favourites success': emptyProps(),
    'Remove from favourites failure': props<{ error: string }>(),
  },
});
