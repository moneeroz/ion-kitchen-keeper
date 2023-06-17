import { IappState } from './iapp-state';

export const AppInitialState: IappState = {
  loading: {
    show: false,
  },
  login: {
    isRecoveringPassword: false,
    isRecoveredPassword: false,
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
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
};
