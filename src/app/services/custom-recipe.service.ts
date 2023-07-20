import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomRecipeService {
  constructor(private http: HttpClient) {}

  private apiURL: string = 'http://localhost:2828/api/openai/create-recipe';

  // createRecipe(prompt: string) {
  //   return this.http.post(this.apiURL, { prompt: prompt });
  // }

  createRecipe(prompt: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.http.post(this.apiURL, { prompt }).subscribe({
        next: (recipe) => {
          // localStorage.setItem('customRecipe', JSON.stringify(recipe));
          observer.next(recipe);
          observer.complete();
        },
        error: (error) => {
          observer.error(error.error);
          observer.complete();
        },
      });
    });
  }
}
