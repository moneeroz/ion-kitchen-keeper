import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { CartApiActions } from './cart.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { selectUser } from '../auth/auth.selectors';
import { IappState } from '../iapp-state';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IappState>,
    private cartService: CartService,
    private toastService: ToastService,
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
          tap(() =>
            this.toastService.successToast('Added to cart successfully!'),
          ),
          catchError((error) => {
            this.toastService.failureToast('Item already in cart!');
            return of(CartApiActions.addToCartFailure({ error }));
          }),
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
          tap(() =>
            this.toastService.successToast('Removed from cart successfully!'),
          ),
          catchError((error) => {
            this.toastService.failureToast('Failed to remove from cart!');
            return of(CartApiActions.removeFromCartFailure({ error }));
          }),
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
          tap(() => this.toastService.successToast('Cart is now empty!')),
          catchError((error) => {
            this.toastService.failureToast('Failed to empty cart!');
            return of(CartApiActions.emptyCartFailure({ error }));
          }),
        );
      }),
    );
  });
}
