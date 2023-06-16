import { IloadingState } from './loading/iloading-state';
import { IloginState } from './login/ilogin-state';
import { IregisterState } from './register/iregister-state';

export interface IappState {
  loading: IloadingState;
  login: IloginState;
  register: IregisterState;
}
