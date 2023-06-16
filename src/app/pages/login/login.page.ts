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
  login,
  loginFail,
  loginSuccess,
  recoverPassword,
  recoverPasswordFail,
  recoverPasswordSuccess,
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
        // this.onIsRecoveringPassword(loginState);
        this.onIsRecoveredPassword(loginState);

        // this.onIsLoggingIn(loginState);
        this.onIsLoggedIn(loginState);

        this.onError(loginState);
        this.toggleLoading(loginState);
      });
  }

  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  private toggleLoading(loginState: IloginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onIsLoggedIn(loginState: IloginState) {
    if (loginState.isLoggedIn) {
      this.router.navigateByUrl('recipes');
    }
  }

  // private onIsLoggingIn(loginState: IloginState) {
  //   if (loginState.isLoggingIn) {
  //     const email = this.loginForm.get('email')?.value;
  //     const password = this.loginForm.get('password')?.value;

  //     this.auth.login(email, password).subscribe({
  //       next: (user) => {
  //         this.store.dispatch(loginSuccess({ user }));
  //       },
  //       error: (err) =>
  //         this.store.dispatch(
  //           loginFail({
  //             error: {
  //               message: 'User not found!',
  //             },
  //           }),
  //         ),
  //     });
  //   }
  // }

  // private async onIsRecoveringPassword(loginState: IloginState) {
  //   if (loginState.isRecoveringPassword) {
  //     this.auth
  //       .recoverLoginDetails(this.loginForm.get('email')!.value)
  //       .subscribe({
  //         next: () => {
  //           this.store.dispatch(recoverPasswordSuccess());
  //         },
  //         error: (error) => this.store.dispatch(recoverPasswordFail({ error })),
  //       });
  //   }
  // }

  private async onIsRecoveredPassword(loginState: IloginState) {
    if (loginState.isRecoveredPassword) {
      const toast = await this.toastController.create({
        message: 'Recovery email sent!',
        duration: 2000,
        position: 'bottom',
        color: 'warning',
      });
      toast.present();
    }
  }

  private async onError(loginState: IloginState) {
    if (loginState.error) {
      const toast = await this.toastController.create({
        message: loginState.error.error,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }

  login() {
    this.store.dispatch(
      login({
        email: this.loginForm.get('email')!.value,
        password: this.loginForm.get('password')!.value,
      }),
    );
    this.loginForm.reset();

    // const formData = this.loginForm.value;

    // console.log(formData);

    // this.userService.loginUser(formData).subscribe({
    //   next: (result) => {
    //     localStorage.setItem('currentUser', JSON.stringify(result));

    //     alert('Logged in successfully!');

    //     this.loginForm.reset();

    //     this.router.navigateByUrl('recipes');
    //   },
    //   error: (err) => {
    //     alert(err.error);

    //     console.log(err);
    //   },
    // });
  }

  register() {
    this.router.navigateByUrl('register');
  }

  forgotPassword() {
    this.store.dispatch(
      recoverPassword({ email: this.loginForm.get('email')!.value }),
    );
  }
}
