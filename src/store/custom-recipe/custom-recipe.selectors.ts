import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const customRecipeFeature = (state: IappState) => state.customRecipe;

export const selectIsLoading = createSelector(
  customRecipeFeature,
  (state) => state.isLoading,
);
export const selectRecipe = createSelector(
  customRecipeFeature,
  (state) => state.recipe,
);
