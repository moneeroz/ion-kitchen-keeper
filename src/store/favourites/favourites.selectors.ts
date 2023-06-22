import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const favouritesFeature = (state: IappState) => state.favourites;

export const selectFavouriteItems = createSelector(
  favouritesFeature,
  (state) => state.items,
);
