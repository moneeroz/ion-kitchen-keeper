import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const cartFeature = (state: IappState) => state.cart;

export const selectCartItems = createSelector(
  cartFeature,
  (state) => state.items,
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (state) => state.length,
);
