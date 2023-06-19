import { IauthState } from './auth/iauth-state';
import { IloadingState } from './loading/iloading-state';
import { IrecipesState } from './recipes/irecipes-state';
import { IregisterState } from './register/iregister-state';

export interface IappState {
  loading: IloadingState;
  register: IregisterState;
  recipes: IrecipesState;
  auth: IauthState;
}
