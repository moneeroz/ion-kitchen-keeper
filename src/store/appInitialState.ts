import { IappState } from './iapp-state';

export const AppInitialState: IappState = {
  loading: {
    show: false,
  },
  register: {
    isRegistering: false,
    isRegistered: false,
    error: null,
  },
  recipes: {
    recipes: [],
    selectedRecipe: null,
    category: null,
    recipeId: null,
    recipe: null,
    isLoading: false,
    error: null,
  },
  auth: {
    isLoggingIn: false,
    isLoggedIn: false,
    isRecoveringPassword: false,
    isRecoveredPassword: false,
    user: null,
    error: null,
  },
  cart: {
    items: [],
    isLoading: false,
    error: null,
  },
  favourites: {
    items: [],
    isLoading: false,
    error: null,
  },
  category: {
    categoryItems: [],
    isLoading: false,
    error: null,
  },
  customRecipe: {
    isLoading: false,
    recipe: null,
    error: null,
  },
};
