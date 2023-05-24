import { Injectable } from '@angular/core';
import { IcartItem } from '../interfaces/icart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiURL: string = 'http://localhost:2828/api/recipes/cart';

  constructor(private http: HttpClient) {}

  getCartItems(userId: string) {
    return this.http.get<IcartItem[]>(this.apiURL + '/' + userId);
  }

  addToCart(userId: string, recipeId: string) {
    return this.http.post<IcartItem>(
      this.apiURL + '/' + userId + '/' + recipeId,
      null,
    );
  }

  deleteFromCart(userId: string, recipeId: string) {
    return this.http.delete<IcartItem>(
      this.apiURL + '/' + userId + '/' + recipeId,
    );
  }

  clearCart(userId: string) {
    return this.http.delete<IcartItem[]>(this.apiURL + '/' + userId);
  }
}
