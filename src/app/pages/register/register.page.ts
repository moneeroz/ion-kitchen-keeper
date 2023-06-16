import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { IappState } from 'src/store/iapp-state';
import { hide, show } from 'src/store/loading/loading.actions';
import { login } from 'src/store/login/login.actions';
import { IregisterState } from 'src/store/register/iregister-state';
import { register } from 'src/store/register/register.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {
  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  registerStateSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private store: Store<IappState>,
    private toastController: ToastController,
  ) {}

  ngOnInit() {
    this.watchRegisterState();
  }

  ngOnDestroy(): void {
    if (this.registerStateSubscription) {
      this.registerStateSubscription.unsubscribe();
    }
  }

  register() {
    const formData = this.registerForm.value;

    this.store.dispatch(register({ userData: formData }));
    this.registerForm.reset();
  }

  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe({
      next: (state) => {
        this.toggleLoading(state);

        this.onRegistered(state);
        this.onError(state);
      },
      // error: (error) => {},
    });
  }

  private toggleLoading(registerState: IregisterState) {
    if (registerState.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private onRegistered(registerState: IregisterState) {
    if (registerState.isRegistered) {
      this.store.dispatch(
        login({
          email: this.registerForm.get('email')!.value,
          password: this.registerForm.get('password')!.value,
        }),
      );
    }
  }

  private async onError(registerState: IregisterState) {
    if (registerState.error) {
      const toast = await this.toastController.create({
        message: registerState.error.error.errors[0].message,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
}
