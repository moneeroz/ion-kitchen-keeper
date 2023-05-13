import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Irecipe } from '../interfaces/irecipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  apiURL: string = 'http://localhost:2828/api/recipes';
  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Irecipe[]>(this.apiURL);
  }

  getRecipesByCategory(category: string) {
    return this.http.get<Irecipe[]>(this.apiURL + '/categories/' + category);
  }

  getRecipe(recipe_id: string) {
    return this.http.get<Irecipe>(this.apiURL + '/' + recipe_id);
  }
  createRecipe(recipe_data: any) {
    return this.http.post<Irecipe>(this.apiURL + '/create-recipe', recipe_data);
  }
}
