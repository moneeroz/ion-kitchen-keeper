import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { EffectsModule } from '@ngrx/effects';
import { registerReducer } from './register/register.reducers';
import { RegisterEffects } from './register/register.effects';
import { recipesReducer } from './recipes/recipes.reducer';
import { RecipesEffects } from './recipes/recipes.effects';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { cartReducer } from './cart/cart.reducer';
import { CartEffects } from './cart/cart.effects';
import { favouritesReducer } from './favourites/favourites.reducer';
import { FavouritesEffects } from './favourites/favourites.effects';

export const appStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('register', registerReducer),
  StoreModule.forFeature('recipes', recipesReducer),
  StoreModule.forFeature('auth', authReducer),
  StoreModule.forFeature('cart', cartReducer),
  StoreModule.forFeature('favourites', favouritesReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([
    RegisterEffects,
    RecipesEffects,
    AuthEffects,
    CartEffects,
    FavouritesEffects,
  ]),
];
