import { StoreModule } from '@ngrx/store';
import { loadingReducer } from './loading/loading.reducers';
import { loginReducer } from './login/login.reducers';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from 'src/app/pages/login/login.effects';

export const appStoreModule = [
  StoreModule.forRoot([]),
  StoreModule.forFeature('loading', loadingReducer),
  StoreModule.forFeature('login', loginReducer),
  EffectsModule.forRoot([]),
  EffectsModule.forFeature([LoginEffects]),
];
