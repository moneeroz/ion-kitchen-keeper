import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/store/auth/auth.actions';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;
  public appPages = [
    { title: 'Recipes', url: 'recipes', icon: 'mail' },
    { title: 'Categories', url: 'categories', icon: 'mail' },
    { title: 'Favourites', url: 'favourites', icon: 'mail' },
    { title: 'Cart', url: 'cart', icon: 'mail' },
  ];
  constructor(
    private router: Router,
    private menu: MenuController,
    private store: Store,
  ) {}

  logout() {
    this.store.dispatch(AuthActions.logoutSuccess());

    this.menu.close();
  }
}
