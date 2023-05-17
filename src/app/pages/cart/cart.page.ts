import { Component, OnInit } from '@angular/core';
import { IcartItem } from 'src/app/interfaces/icart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: IcartItem[] = [];
  constructor(private cartService: CartService) {}

  ionViewWillEnter() {
    this.cart = this.cartService.cartItems;
    // console.log(this.cart);
  }
  ngOnInit() {}

  onRemoveFromCart(item: IcartItem) {
    this.cartService.removeFromCart(item);
    this.cart = this.cartService.cartItems;
    // console.log(this.cart);
    alert('removed from cart');
  }
}
