import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { IappState } from '../iapp-state';
import { RecipeService } from 'src/app/services/recipe.service';
import { CategoryActions } from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipeService,
  ) {}

  getCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getRecipesByCategoryRequest),
      exhaustMap(({ category }) => {
        return this.recipeService.getRecipesByCategory(category).pipe(
          map((items) =>
            CategoryActions.getRecipesByCategorySuccess({ items: items }),
          ),
          catchError((error) =>
            of(CategoryActions.getRecipesByCategoryFailure({ error })),
          ),
        );
      }),
    );
  });
}
