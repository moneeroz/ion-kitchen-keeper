import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { SearchbarCustomEvent } from '@ionic/angular';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { Iuser } from 'src/app/interfaces/iuser';
import { FavouriteService } from 'src/app/services/favourite.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {
  pageTitle: string = 'recipes';
  recipes: Irecipe[] = [];
  filteredRecipes: Irecipe[] = [];
  user!: Iuser;

  @Input() inputQuery: string = '';

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
        this.filteredRecipes = this.recipes;
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

  filterRecipes() {
    if (this.inputQuery) {
      return (this.filteredRecipes = this.recipes.filter((recipe) => {
        const searchQuery = this.inputQuery.toLowerCase();

        const recipeNameMatch = recipe.name.toLowerCase().includes(searchQuery);

        const ingredientNameMatch = recipe.ingredients
          .toLowerCase()
          .includes(searchQuery);

        return recipeNameMatch || ingredientNameMatch;
      }));
    }
    return (this.filteredRecipes = this.recipes);
  }
}
