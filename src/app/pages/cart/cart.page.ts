import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
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
  items$ = this.store.select(selectCartItems);
  itemCount$ = this.store.select(selectCartItemCount);
  constructor(
    private store: Store<IappState>,
    private alertController: AlertController,
  ) {
    this.store.dispatch(CartApiActions.getCartRequest());
  }

  ngOnInit() {}

  deleteFromCart(recipeId: string) {
    this.store.dispatch(CartApiActions.removeFromCartRequest({ recipeId }));
  }

  emptyCart() {
    this.store.dispatch(CartApiActions.emptyCartRequest());
  }

  async onDelete(recipeId: string) {
    const deleteAlert = await this.alertController.create({
      header: 'Delete',

      message: 'Are you sure you want to remove this recipe from cart?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          handler: () => {
            this.deleteFromCart(recipeId);
          },
        },
      ],
    });
    await deleteAlert.present();
  }

  async onEmptyCart() {
    const emptyCartAlert = await this.alertController.create({
      header: 'Empty Cart',

      message: 'Are you sure you want to empty your cart?',
      buttons: [
        {
          text: 'NO',
        },
        {
          text: 'YES',
          handler: () => {
            this.emptyCart();
          },
        },
      ],
    });
    await emptyCartAlert.present();
  }
}
