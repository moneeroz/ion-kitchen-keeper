import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IcartItem } from 'src/app/interfaces/icart';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { CartApiActions } from 'src/store/cart/cart.actions';
import {
  selectCartItemCount,
  selectCartItems,
} from 'src/store/cart/cart.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  // user!: Iuser;
  cart: IcartItem[] = [];

  items$ = this.store.select(selectCartItems);
  itemCount$ = this.store.select(selectCartItemCount);
  constructor(
    private cartService: CartService,
    private userSrvice: UserService,
    private store: Store<IappState>,
  ) {
    this.store.dispatch(CartApiActions.getCartRequest());
  }

  ionViewWillEnter() {
    // this.user = this.userSrvice.getUserData();
    // this.cartService.getCartItems(this.user.id).subscribe({
    //   next: (cartItems) => {
    //     this.cart = cartItems;
    //     console.log(this.cart);
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }
  ngOnInit() {}

  onDelete(recipeId: string) {
    this.store.dispatch(CartApiActions.removeFromCartRequest({ recipeId }));
    // const index = this.cart.findIndex((item) => {
    //   return item.recipeId === recipe_id;
    // });
    // this.cartService.deleteFromCart(this.user.id, recipe_id).subscribe({
    //   next: (result) => {
    //     console.log(result);
    //     alert('removed from cart successfully');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    // this.cart.splice(index, 1);
  }

  onEmptyCart() {
    this.store.dispatch(CartApiActions.emptyCartRequest());
    // this.cartService.clearCart(this.user.id).subscribe({
    //   next: (result) => {
    //     console.log(result);
    //     alert('cart is now empty');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
    // this.cart.length = 0;
  }
}
