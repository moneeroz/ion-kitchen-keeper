import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IcartItem } from 'src/app/interfaces/icart';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { selectCartItemCount } from 'src/store/cart/cart.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  // user: Iuser;
  // cartItems!: IcartItem[];
  quantity: number = 0;

  itemCount$ = this.store.select(selectCartItemCount);
  constructor(
    private cart: CartService,
    private userService: UserService,
    private store: Store<IappState>,
  ) {
    // this.user = this.userService.getUserData();
  }

  ngOnInit() {
    // this.getItems();

    this.store.dispatch(CartApiActions.getCartRequest());
  }
  // getItems() {
  //   this.cart.getCartItems(this.user.id).subscribe({
  //     next: (recipes) => {
  //       this.cartItems = recipes;
  //       this.quantity = recipes.length;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }
}
