import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IappState } from 'src/store/iapp-state';
import { hide, show } from 'src/store/loading/loading.actions';
import { IloginState } from 'src/store/login/ilogin-state';
import {
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccessful,
} from 'src/store/login/login.actions';

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

  loginStateSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<IappState>,
    private toastController: ToastController,
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsRecoveringPassword(loginState);
        this.onIsRecoveredPassword(loginState);
        this.onIsRecoverPasswordFail(loginState);
      });
  }

  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private async onIsRecoveringPassword(loginState: IloginState) {
    if (loginState.isRecoveringPassword) {
      this.store.dispatch(show());

      // this.auth
      //   .recoverLoginDetails(this.loginForm.get('email')!.value)
      //   .subscribe(() => {
      //     this.store.dispatch(recoverPasswordSuccessful());
      //   });
      this.auth
        .recoverLoginDetails(this.loginForm.get('email')!.value)
        .subscribe({
          next: () => {
            this.store.dispatch(recoverPasswordSuccessful());
          },
          error: (error) => this.store.dispatch(recoverPasswordFail({ error })),
        });
    }
  }

  private async onIsRecoveredPassword(loginState: IloginState) {
    if (loginState.isRecoveredPassword) {
      this.store.dispatch(hide());

      const toast = await this.toastController.create({
        message: 'Recovery email sent!',
        duration: 2000,
        position: 'bottom',
        color: 'warning',
      });
      toast.present();
    }
  }

  private async onIsRecoverPasswordFail(loginState: IloginState) {
    if (loginState.error) {
      this.store.dispatch(hide());

      const toast = await this.toastController.create({
        message: loginState.error.message,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }

  login() {
    const formData = this.loginForm.value;

    this.userService.loginUser(formData).subscribe({
      next: (result) => {
        localStorage.setItem('currentUser', JSON.stringify(result));

        alert('Logged in successfully!');

        this.loginForm.reset();

        this.router.navigateByUrl('recipes');
      },
      error: (err) => {
        alert(err.error);

        console.log(err);
      },
    });
  }

  forgotPassword() {
    // this.store.dispatch(show());

    this.store.dispatch(recoverPassword());

    // setTimeout(() => {
    //   this.store.dispatch(hide());
    // }, 2000);
  }
}
