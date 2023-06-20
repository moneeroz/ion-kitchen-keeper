import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { CartApiActions } from './cart.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private cartService: CartService,
  ) {}

  getCartItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.getCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.getCartItems(userId).pipe(
          map((items) => CartApiActions.getCartSuccess({ items: items })),
          catchError((error) => of(CartApiActions.getCartFailure({ error }))),
        );
      }),
    );
  });

  addToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.addToCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.addToCart(userId, action.recipeId).pipe(
          map((item) => CartApiActions.addToCartSuccess({ recipe: item })),
          catchError((error) => of(CartApiActions.addToCartFailure({ error }))),
        );
      }),
    );
  });

  removeFromCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.removeFromCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.deleteFromCart(userId, action.recipeId).pipe(
          map(() => CartApiActions.removeFromCartSuccess()),
          catchError((error) =>
            of(CartApiActions.removeFromCartFailure({ error })),
          ),
        );
      }),
    );
  });

  emptyCart = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartApiActions.emptyCartRequest),
      concatLatestFrom(() => this.store.select(selectUser)),
      exhaustMap(([action, user]) => {
        const userId = user?.id ?? '';
        return this.cartService.clearCart(userId).pipe(
          map(() => CartApiActions.emptyCartSuccess()),
          catchError((error) => of(CartApiActions.emptyCartFailure({ error }))),
        );
      }),
    );
  });
}
