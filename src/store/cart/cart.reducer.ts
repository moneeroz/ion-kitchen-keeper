import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../appInitialState';
import { CartApiActions } from './cart.actions';
import { IcartState } from './icart-state';

export const initialState = AppInitialState.cart;

export const cartReducer = createReducer(
  initialState,
  on(
    CartApiActions.getCartRequest,
    (state): IcartState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    CartApiActions.getCartSuccess,
    (state, action): IcartState => ({
      ...state,
      items: [...state.items, ...action.items],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    CartApiActions.getCartFailure,
    (state, action): IcartState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    CartApiActions.addToCartRequest,
    (state): IcartState => ({
      ...state,
      isLoading: true,
      error: null,
    }),
  ),
  on(
    CartApiActions.addToCartSuccess,
    (state, action): IcartState => ({
      ...state,
      items: [...state.items, action.recipe],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    CartApiActions.addToCartFailure,
    (state, action): IcartState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    CartApiActions.removeFromCartRequest,
    (state, action): IcartState => ({
      ...state,
      items: state.items.filter((item) => item.recipeId !== action.recipeId),
      isLoading: true,
      error: null,
    }),
  ),
  on(
    CartApiActions.removeFromCartSuccess,
    (state): IcartState => ({
      ...state,
      error: null,
    }),
  ),
  on(
    CartApiActions.removeFromCartFailure,
    (state, action): IcartState => ({
      ...state,
      isLoading: false,
      error: action.error,
    }),
  ),
  on(
    CartApiActions.emptyCartRequest,
    (state): IcartState => ({
      ...state,
      items: [],
      isLoading: true,
      error: null,
    }),
  ),
  on(
    CartApiActions.emptyCartSuccess,
    (state): IcartState => ({
      ...state,
      items: [],
      isLoading: false,
      error: null,
    }),
  ),
  on(
    CartApiActions.emptyCartFailure,
    (state, action): IcartState => ({
      ...state,
      items: [],
      isLoading: false,
      error: action.error,
    }),
  ),
);
