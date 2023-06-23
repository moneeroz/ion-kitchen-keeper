import { createReducer, on } from '@ngrx/store';
import { hide, show } from './loading.actions';
import { IloadingState } from './iloading-state';
import { AppInitialState } from '../appInitialState';

const initialState: IloadingState = AppInitialState.loading;
const reducer = createReducer(
  initialState,
  on(show, (): IloadingState => {
    return { show: true };
  }),
  on(hide, (): IloadingState => {
    return { show: false };
  }),
);

export function loadingReducer(state: IloadingState, action: any) {
  return reducer(state, action);
}
