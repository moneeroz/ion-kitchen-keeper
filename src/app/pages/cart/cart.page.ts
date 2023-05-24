import { Component, OnInit } from '@angular/core';
import { IcartItem } from 'src/app/interfaces/icart';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  user!: Iuser;
  cart: IcartItem[] = [];
  constructor(
    private cartService: CartService,
    private userSrvice: UserService,
  ) {}

  ionViewWillEnter() {
    this.user = this.userSrvice.getUserData();

    this.cartService.getCartItems(this.user.id).subscribe({
      next: (cartItems) => {
        this.cart = cartItems;
        console.log(this.cart);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit() {}

  onDelete(recipe_id: string) {
    const index = this.cart.findIndex((item) => {
      return item.recipeId === recipe_id;
    });

    this.cartService.deleteFromCart(this.user.id, recipe_id).subscribe({
      next: (result) => {
        console.log(result);
        alert('removed from cart successfully');
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.cart.splice(index, 1);
  }

  onEmptyCart() {
    this.cartService.clearCart(this.user.id).subscribe({
      next: (result) => {
        console.log(result);
        alert('cart is now empty');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.cart.length = 0;
  }
}
