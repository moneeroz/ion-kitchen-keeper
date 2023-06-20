import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';
import { FavouriteService } from 'src/app/services/favourite.service';
import { FavouriteApiActions } from './favourites.actions';

@Injectable()
export class FavouritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private favouritesService: FavouriteService,
  ) {}

  getFavouriteItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.getFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService.getFavourites(userId).pipe(
          map((items) =>
            FavouriteApiActions.getFavouritesSuccess({ items: items }),
          ),
          catchError((error) =>
            of(FavouriteApiActions.getFavouriteFailure({ error })),
          ),
        );
      }),
    );
  });

  addToFavourites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.addToFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService
          .addToFavourites(userId, action.recipeId)
          .pipe(
            map((item) =>
              FavouriteApiActions.addToFavouritesSuccess({ recipe: item }),
            ),
            catchError((error) =>
              of(FavouriteApiActions.addToFavouritesFailure({ error })),
            ),
          );
      }),
    );
  });

  removeFromFavourites = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavouriteApiActions.removeFromFavouritesRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.favouritesService
          .deleteFromFavourites(userId, action.recipeId)
          .pipe(
            map(() => FavouriteApiActions.removeFromFavouritesSuccess()),
            catchError((error) =>
              of(FavouriteApiActions.removeFromFavouritesFailure({ error })),
            ),
          );
      }),
    );
  });
}
