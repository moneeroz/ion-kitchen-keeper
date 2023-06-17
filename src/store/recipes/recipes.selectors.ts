import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const selectFeature = (state: IappState) => state.recipes;

export const selectIsLoading = createSelector(
  selectFeature,
  (state) => state.isLoading,
);

export const selectRecipes = createSelector(
  selectFeature,
  (state) => state.recipes,
);

export const selectError = createSelector(
  selectFeature,
  (state) => state.error,
);
