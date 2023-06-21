import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { CategoryActions } from './category.actions';
import { IcategoryState } from './icategory-state';

export const initialState = AppInitialState.category;

export const categoryReducer = createReducer(
  initialState,
  on(
    CategoryActions.getRecipesByCategoryRequest,
    (state): IcategoryState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    CategoryActions.getRecipesByCategorySuccess,
    (state, action): IcategoryState => ({
      ...state,
      categoryItems: [...action.items],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    CategoryActions.getRecipesByCategoryFailure,
    (state, action): IcategoryState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
);
