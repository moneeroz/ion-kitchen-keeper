import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

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
  constructor(private router: Router, private menu: MenuController) {}

  logout() {
    localStorage.removeItem('currentUser');
    alert('Loggedout successfully!');
    this.menu.close();
    this.router.navigateByUrl('login');
  }
}
