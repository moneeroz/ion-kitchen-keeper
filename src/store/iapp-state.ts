import { IauthState } from './auth/iauth-state';
import { IcartState } from './cart/icart-state';
import { IfavouritesState } from './favourites/ifavourites-state';
import { IloadingState } from './loading/iloading-state';
import { IrecipesState } from './recipes/irecipes-state';
import { IregisterState } from './register/iregister-state';

export interface IappState {
  loading: IloadingState;
  register: IregisterState;
  recipes: IrecipesState;
  auth: IauthState;
  cart: IcartState;
  favourites: IfavouritesState;
}
