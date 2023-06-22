import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { CustomRecipeActions } from './custom-recipe.actions';
import { IcustomRecipeState } from './icustom-recipe-state';

export const initialState = AppInitialState.customRecipe;

export const customRecipeReducer = createReducer(
  initialState,
  on(
    CustomRecipeActions.generateRecipeRequest,
    (state): IcustomRecipeState => ({
      ...state,
      isLoading: true,
      recipe: null,
      error: null,
    }),
  ),
  on(
    CustomRecipeActions.generateRecipeSuccess,
    (state, action): IcustomRecipeState => ({
      ...state,
      isLoading: false,
      recipe: action.recipe,
      error: null,
    }),
  ),
  on(
    CustomRecipeActions.generateRecipeFailure,
    (state, action): IcustomRecipeState => ({
      ...state,
      isLoading: false,
      recipe: null,
      error: action.error,
    }),
  ),
);
