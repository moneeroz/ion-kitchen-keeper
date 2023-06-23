import { createReducer, on } from '@ngrx/store';
import { hide, show } from './loading.actions';
import { IloadingState } from './iloading-state';
import { AppInitialState } from '../appInitialState';

const initialState: IloadingState = AppInitialState.loading;
export const loadingReducer = createReducer(
  initialState,
  on(show, (): IloadingState => {
    return { show: true };
  }),
  on(hide, (): IloadingState => {
    return { show: false };
  }),
);
