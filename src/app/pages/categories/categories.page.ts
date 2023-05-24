import { Component, OnInit } from '@angular/core';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  pageTitle: string = 'catagories';
  recipes: Irecipe[] = [];
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getRecipesByCategory('chicken').subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getRecipesByCategory(category: string) {
    this.recipeService.getRecipesByCategory(category).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
