import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { FavouriteApiActions } from './favourites.actions';
import { IfavouritesState } from './ifavourites-state';

export const initialState = AppInitialState.favourites;

export const favouritesReducer = createReducer(
  initialState,
  on(
    FavouriteApiActions.getFavouritesRequest,
    (state): IfavouritesState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.getFavouritesSuccess,
    (state, action): IfavouritesState => ({
      ...state,
      items: [...action.items],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.getFavouriteFailure,
    (state, action): IfavouritesState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    FavouriteApiActions.addToFavouritesRequest,
    (state): IfavouritesState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.addToFavouritesSuccess,
    (state, action): IfavouritesState => ({
      ...state,
      items: [...state.items, action.recipe],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.addToFavouritesFailure,
    (state, action): IfavouritesState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    FavouriteApiActions.removeFromFavouritesRequest,
    (state, action): IfavouritesState => ({
      ...state,
      items: state.items.filter((item) => item.recipeId !== action.recipeId),
      isLoading: true,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.removeFromFavouritesSuccess,
    (state): IfavouritesState => ({
      ...state,
      error: null,
    }),
  ),
  on(
    FavouriteApiActions.removeFromFavouritesFailure,
    (state, action): IfavouritesState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
);
