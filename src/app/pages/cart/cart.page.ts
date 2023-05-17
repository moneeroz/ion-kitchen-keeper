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
    this.cart = this.cartService.CartItems;
    console.log(this.cart);
  }
  ngOnInit() {}
}
