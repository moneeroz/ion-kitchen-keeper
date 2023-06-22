import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRecipeActions } from './custom-recipe.actions';
import { CustomRecipeService } from 'src/app/services/custom-recipe.service';

@Injectable()
export class CustomRecipeEffects {
  generateRecipe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomRecipeActions.generateRecipeRequest),
      exhaustMap((action) =>
        this.customRecipeService.createRecipe(action.prompt).pipe(
          map((recipe) =>
            CustomRecipeActions.generateRecipeSuccess({ recipe: recipe }),
          ),
          catchError((error) =>
            of(CustomRecipeActions.generateRecipeFailure({ error })),
          ),
        ),
      ),
    );
  });

  generateRecipeSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CustomRecipeActions.generateRecipeSuccess),
        tap((action) =>
          localStorage.setItem('customRecipe', JSON.stringify(action.recipe)),
        ),
        tap(() => this.router.navigateByUrl('custom-recipe')),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private customRecipeService: CustomRecipeService,
    private router: Router,
  ) {}
}
