import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Irecipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {}

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

  onFavourite(recipe_id: string) {
    console.log(recipe_id);
    console.log('added to favourites');
    this.router.navigate(['recipe', recipe_id]);
  }
}
