import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AuthActions } from 'src/store/auth/auth.actions';
import { authFeature } from 'src/store/auth/auth.selectors';
import { IauthState } from 'src/store/auth/iauth-state';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { IappState } from 'src/store/iapp-state';
import { hide, show } from 'src/store/loading/loading.actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  authStateSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<IappState>,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.watchAuthState();
  }

  ngOnDestroy(): void {
    if (this.authStateSubscription) {
      this.authStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(authState: IauthState) {
    if (authState.isLoggingIn || authState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private watchAuthState() {
    this.authStateSubscription = this.store.select(authFeature).subscribe({
      next: (state) => {
        this.toggleLoading(state);
        this.onIsRecoveredPassword(state);
        this.onSuccess(state);
        this.onloggedIn(state);
        this.onError(state);
      },
      // error: (error) => {},
    });
  }

  private async onIsRecoveredPassword(authState: IauthState) {
    if (authState.isRecoveredPassword) {
      const toast = await this.toastController.create({
        message: 'Recovery email sent!',
        duration: 2000,
        position: 'bottom',
        color: 'warning',
      });
      toast.present();
    }
  }

  private async onError(authState: IauthState) {
    if (authState.error) {
      const toast = await this.toastController.create({
        message: authState.error,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
  private async onSuccess(authState: IauthState) {
    if (authState.isLoggedIn) {
      const toast = await this.toastController.create({
        message: `Logged in as ${authState.user?.username} !`,
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
    }
  }

  private onloggedIn(authState: IauthState) {
    if (authState.isLoggedIn) {
      this.store.dispatch(CartApiActions.getCartRequest());
    }
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    const credentials = {
      email: email,
      password: password,
    };

    this.store.dispatch(AuthActions.loginRequest({ credentials }));
    this.loginForm.reset();
  }

  register() {
    this.router.navigateByUrl('register');
  }

  forgotPassword() {
    this.store.dispatch(
      AuthActions.recoverPassword({
        email: this.loginForm.get('email')!.value,
      }),
    );
  }
}
