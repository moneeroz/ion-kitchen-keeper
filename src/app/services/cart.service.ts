import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IcartItem } from '../interfaces/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cart: IcartItem[] = [];
  constructor() {
    this.loadCartItems();
  }

  get cartItems() {
    return this._cart;
  }

  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this._cart));
  }

  private loadCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) this._cart = JSON.parse(storedItems);
  }

  addToCart(item: IcartItem): void {
    const items = this._cart;

    const itemAlreadyInCart = items.find((_item) => _item.id === item.id);

    !itemAlreadyInCart ? items.push(item) : (itemAlreadyInCart.quantity += 1);

    this.saveCartItems();
    this._cart = items;
    alert('added to cart');
  }

  removeFromCart(item: IcartItem): void {
    const index = this.cartItems.findIndex((_item) => _item.id === item.id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
      this._cart = this.cartItems;
    }
  }

  clearCart(): void {
    this.cartItems.length = 0;
    this.saveCartItems();
    this._cart = this.cartItems;
  }
}
