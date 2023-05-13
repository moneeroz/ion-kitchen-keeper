import { Component, OnInit } from '@angular/core';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Irecipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
