import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Recipes', url: 'recipes', icon: 'mail' },
    { title: 'Categories', url: 'categories', icon: 'mail' },
    { title: 'Favourites', url: 'favourites', icon: 'mail' },
  ];
  constructor() {}
}
