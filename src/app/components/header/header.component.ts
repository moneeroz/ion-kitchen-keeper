import { Component, Input, OnInit } from '@angular/core';
import { IcartItem } from 'src/app/interfaces/icart';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string = '';

  user: Iuser;
  cartItems!: IcartItem[];
  quantity: number = 0;
  constructor(private cart: CartService, private userService: UserService) {
    this.user = this.userService.getUserData();
  }

  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.cart.getCartItems(this.user.id).subscribe({
      next: (recipes) => {
        this.cartItems = recipes;
        this.quantity = recipes.length;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
