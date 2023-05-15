import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { FavouriteService } from 'src/app/services/favourite.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  recipes: Irecipe[] = [];
  user: any;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private userService: UserService,
    private favouriteService: FavouriteService,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.user = this.userService.getUserData();

    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }

  onFavourite(recipe_id: string) {
    console.log(recipe_id);
    this.favouriteService.addToFavourites(this.user.id, recipe_id).subscribe({
      next: (result) => {
        console.log(result);
        alert('Recipe added to Favourites');
      },
      error: (err) => {
        console.log(err);
        alert('Recipe is already in Favourites');
      },
    });
  }
}
