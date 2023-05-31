import { Component, OnInit } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  user!: Iuser;
  ingredients: string[] = [];

  clickedIngredients: boolean[] = [];

  completedShopping: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
  ) {}

  ionViewWillEnter() {
    let items;
    this.user = this.userService.getUserData();
    this.cartService.getCartItems(this.user.id).subscribe({
      next: (cartItems) => {
        items = cartItems.map((item) => item.recipe.ingredients.split('\n'));
        for (const arr of items) {
          arr.forEach((item) => {
            this.ingredients.push(item);

            this.clickedIngredients.push(false);
          });
        }
        console.log(this.ingredients);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {}

  onClick(index: number) {
    this.clickedIngredients[index] = !this.clickedIngredients[index];

    this.completedShopping = this.clickedIngredients.every(
      (clicked) => clicked,
    );
  }
}
