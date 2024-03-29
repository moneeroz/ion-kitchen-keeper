import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/store/auth/auth.actions';
import {
  selectIsLoggedIn,
  selectUserName,
} from 'src/store/auth/auth.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  user$ = this.store.select(selectUserName);
  public appPages = [
    { title: 'Recipes', url: 'recipes', icon: 'pizza' },
    { title: 'Categories', url: 'categories', icon: 'file-tray' },
    { title: 'Favourites', url: 'favourites', icon: 'heart' },
    { title: 'Shopping List', url: 'cart', icon: 'cart' },
    { title: 'Custom Recipe', url: 'add-custom-recipe', icon: 'cash' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private store: Store<IappState>,
    private alertController: AlertController,
  ) {}

  logout() {
    this.store.dispatch(AuthActions.logoutSuccess());

    this.menu.close();
  }

  login() {
    this.router.navigateByUrl('login');

    this.menu.close();
  }

  async onLogout() {
    const logoutAlert = await this.alertController.create({
      header: 'Alert',

      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          handler: () => {
            this.logout();
          },
        },
      ],
    });
    await logoutAlert.present();
  }
}
