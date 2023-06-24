import { createSelector } from '@ngrx/store';
import { IappState } from '../iapp-state';

export const authFeature = (state: IappState) => state.auth;

export const selectIsLoggedIn = createSelector(
  authFeature,
  (state) => state.isLoggedIn,
);
export const selectIsLoggingIn = createSelector(
  authFeature,
  (state) => state.isLoggingIn,
);
export const selectUser = createSelector(authFeature, (state) => state.user);
export const selectUserName = createSelector(
  authFeature,
  (state) => state.user?.username,
);
