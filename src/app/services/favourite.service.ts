import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ifavourite } from '../interfaces/ifavourite';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  apiURL: string = 'http://localhost:2828/api/recipes/favourites';

  constructor(private http: HttpClient) {}

  getFavourites(userId: string) {
    return this.http.get<Ifavourite[]>(this.apiURL + '/' + userId);
  }

  addToFavourites(userId: string, recipeId: string) {
    return this.http.post<Ifavourite>(
      this.apiURL + '/' + userId + '/' + recipeId,
      null,
    );
  }
  deleteFromFavourites(userId: string, recipeId: string) {
    return this.http.delete<Ifavourite>(
      this.apiURL + '/' + userId + '/' + recipeId,
    );
  }
}
