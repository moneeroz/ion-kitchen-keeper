import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  StoreModule,
} from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducer';
import { EffectsModule } from '@ngrx/effects';
import { registerReducer } from './register/register.reducer';
import { RegisterEffects } from './register/register.effects';
import { recipesReducer } from './recipes/recipes.reducer';
import { RecipesEffects } from './recipes/recipes.effects';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { cartReducer } from './cart/cart.reducer';
import { CartEffects } from './cart/cart.effects';
import { favouritesReducer } from './favourites/favourites.reducer';
import { FavouritesEffects } from './favourites/favourites.effects';
import { categoryReducer } from './category/category.reducer';
import { CategoryEffects } from './category/category.effects';
import { customRecipeReducer } from './custom-recipe/custom-recipe.reducer';
import { CustomRecipeEffects } from './custom-recipe/custom-recipe.effects';
import { IappState } from './iapp-state';
import { localStorageSync } from 'ngrx-store-localstorage';

const reducers: ActionReducerMap<IappState> = {
  auth: authReducer,
  register: registerReducer,
  recipes: recipesReducer,
  cart: cartReducer,
  favourites: favouritesReducer,
  category: categoryReducer,
  customRecipe: customRecipeReducer,
  loading: loadingReducer,
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      'auth',
      'register',
      'recipes',
      'cart',
      'favourites',
      'category',
      'customRecipes',
      'loading',
    ],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const appStoreModule = [
  // StoreModule.forRoot([]),
  // StoreModule.forFeature('loading', loadingReducer),
  // StoreModule.forFeature('register', registerReducer),
  // StoreModule.forFeature('recipes', recipesReducer),
  // StoreModule.forFeature('auth', authReducer),
  // StoreModule.forFeature('cart', cartReducer),
  // StoreModule.forFeature('favourites', favouritesReducer),
  // StoreModule.forFeature('category', categoryReducer),
  // StoreModule.forFeature('customRecipe', customRecipeReducer),
  StoreModule.forRoot(reducers, { metaReducers }),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    RegisterEffects,
    RecipesEffects,
    AuthEffects,
    CartEffects,
    FavouritesEffects,
    CategoryEffects,
    CustomRecipeEffects,
  ]),
];
