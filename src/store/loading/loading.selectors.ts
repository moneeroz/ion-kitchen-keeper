import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const loadingFeature = (state: IappState) => state.loading;

export const selectShow = createSelector(loadingFeature, (state) => state.show);
