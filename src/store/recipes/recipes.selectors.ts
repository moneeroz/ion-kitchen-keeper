import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const recipesFeature = (state: IappState) => state.recipes;

export const selectIsLoading = createSelector(
  recipesFeature,
  (state) => state.isLoading,
);

export const selectRecipes = createSelector(
  recipesFeature,
  (state) => state.recipes,
);

export const selectError = createSelector(
  recipesFeature,
  (state) => state.error,
);
