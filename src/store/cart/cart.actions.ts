import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IcartItem } from 'src/app/interfaces/icart';

export const CartApiActions = createActionGroup({
  source: 'Recipes API',
  events: {
    'Get cart request': emptyProps(),
    'Get cart success': props<{ items: IcartItem[] }>(),
    'Get cart failure': props<{ error: string }>(),
    'Add to cart request': props<{ recipeId: string }>(),
    'Add to cart success': props<{ recipe: IcartItem }>(),
    'Add to cart failure': props<{ error: string }>(),
    'Remove from cart request': props<{ recipeId: string }>(),
    'Remove from cart success': emptyProps(),
    'Remove from cart failure': props<{ error: string }>(),
    'Empty cart request': emptyProps(),
    'Empty cart success': emptyProps(),
    'Empty cart failure': props<{ error: string }>(),
  },
});
