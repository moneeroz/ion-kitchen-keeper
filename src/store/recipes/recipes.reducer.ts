import { createReducer, on } from '@ngrx/store';
import { RecipesApiActions } from './recipes.actions';
import { AppInitialState } from '../appInitialState';
import { IrecipesState } from './irecipes-state';

export const initialState = AppInitialState.recipes;

export const recipesReducer = createReducer(
  initialState,
  on(
    RecipesApiActions.getRecipes,
    (state): IrecipesState => ({
      ...state,
      isLoading: true,
    }),
  ),
  on(
    RecipesApiActions.getRecipesSuccess,
    (state, action): IrecipesState => ({
      ...state,
      isLoading: false,
      recipes: action.recipes,
    }),
  ),
  on(
    RecipesApiActions.getRecipesFailure,
    (state, action): IrecipesState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    RecipesApiActions.getRecipesByCatagory,
    (state, { recipes, category }): IrecipesState => ({
      ...state,
      recipes: [...recipes],
      category: category,
    }),
  ),
  on(
    RecipesApiActions.getRecipeById,
    (state, { recipe, recipeId }): IrecipesState => ({
      ...state,
      selectedRecipe: recipe,
      recipeId: recipeId,
    }),
  ),
  on(
    RecipesApiActions.createdNewRecipe,
    (state, { recipe }): IrecipesState => ({
      ...state,
      recipes: [...state.recipes, recipe],
    }),
  ),
);
