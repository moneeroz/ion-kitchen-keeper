import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const registerFeature = (state: IappState) => state.register;

export const selectIsRegistering = createSelector(
  registerFeature,
  (state) => state.isRegistering,
);
export const selectIsRegistered = createSelector(
  registerFeature,
  (state) => state.isRegistered,
);
