import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';
import { FavouriteService } from 'src/app/services/favourite.service';
import { FavouriteApiActions } from './favourites.actions';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class FavouritesEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private favouritesService: FavouriteService,
    private toastService: ToastService,
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
            tap(() =>
              this.toastService.successToast(
                'Added to favourites successfully!',
              ),
            ),
            catchError((error) => {
              this.toastService.failureToast('Item already in favourites!');
              return of(FavouriteApiActions.addToFavouritesFailure({ error }));
            }),
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
            tap(() =>
              this.toastService.successToast(
                'Removed from favourites successfully!',
              ),
            ),
            catchError((error) => {
              this.toastService.failureToast(
                'Failed to remove from favourites!',
              );
              return of(
                FavouriteApiActions.removeFromFavouritesFailure({ error }),
              );
            }),
          );
      }),
    );
  });
}
