import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const categoryFeature = (state: IappState) => state.category;

export const selectCategoryItems = createSelector(
  categoryFeature,
  (state) => state.categoryItems,
);

export const selectCategoryLoading = createSelector(
  categoryFeature,
  (state) => state.isLoading,
);

export const selectCategoryError = createSelector(
  categoryFeature,
  (state) => state.error,
);
