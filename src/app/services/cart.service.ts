import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IcartItem } from '../interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: IcartItem[] = [];
  constructor() {}

  addToCart(item: IcartItem): void {
    const items = this._cart;

    const itemAlreadyInCart = items.find((_item) => _item.id === item.id);

    !itemAlreadyInCart ? items.push(item) : (itemAlreadyInCart.quantity += 1);

    this._cart = items;
    alert('added to cart');
  }

  get CartItems() {
    return this._cart;
  }
}
