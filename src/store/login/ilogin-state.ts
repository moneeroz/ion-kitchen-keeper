export interface IloginState {
  isRecoveringPassword: boolean;
  isRecoveredPassword: boolean;
  isLoggingIn: boolean;
  isLoggedIn: boolean;
  error: string | null;
}
