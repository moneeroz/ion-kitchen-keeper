import { Iuser } from 'src/app/interfaces/iuser';

export interface IauthState {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  isRecoveringPassword: boolean;
  isRecoveredPassword: boolean;
  user: Iuser | null;
  error: string | null;
}
