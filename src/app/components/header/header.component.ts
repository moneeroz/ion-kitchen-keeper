import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IcartItem } from 'src/app/interfaces/icart';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { selectIsLoggedIn } from 'src/store/auth/auth.selectors';
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

  isLoggedIn$ = this.store.select(selectIsLoggedIn);
  itemCount$ = this.store.select(selectCartItemCount);
  constructor(private store: Store<IappState>) {}

  ngOnInit() {
    // this.store.dispatch(CartApiActions.getCartRequest());
  }
}
