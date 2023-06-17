import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipesApiActions } from './recipes.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class RecipesEffects {
  getRecipes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RecipesApiActions.getRecipes),
      mergeMap(() => {
        return this.recipeService.getRecipes().pipe(
          map((recipes) => RecipesApiActions.getRecipesSuccess({ recipes })),
          catchError((error) =>
            of(RecipesApiActions.getRecipesFailure({ error: error.message })),
          ),
        );
      }),
    );
  });

  constructor(
    private actions$: Actions,
    private recipeService: RecipeService,
  ) {}
}
