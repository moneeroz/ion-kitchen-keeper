import { IappState } from './iapp-state';

export const AppInitialState: IappState = {
  loading: {
    show: false,
  },
  login: {
    isRecoveringPassword: false,
    isRecoveredPassword: false,
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
  },
};
