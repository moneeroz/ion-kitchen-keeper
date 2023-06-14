import { IloadingState } from './loading/iloading-state';
import { IloginState } from './login/ilogin-state';

export interface IappState {
  loading: IloadingState;
  login: IloginState;
}
