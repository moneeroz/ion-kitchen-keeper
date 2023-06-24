import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { Iuser } from 'src/app/interfaces/iuser';
import { CartService } from 'src/app/services/cart.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { CartApiActions } from 'src/store/cart/cart.actions';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.page.html',
  styleUrls: ['./recipe.page.scss'],
})
export class RecipePage implements OnInit {
  recipe_id: string | null = '';
  recipe?: Irecipe;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store: Store,
  ) {}

  ionViewWillEnter() {
    this.recipe_id = this.route.snapshot.paramMap.get('recipe_id');

    this.recipeService.getRecipe(this.recipe_id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        console.log(this.recipe);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit() {}

  addToCart() {
    this.store.dispatch(
      CartApiActions.addToCartRequest({ recipeId: this.recipe_id! }),
    );
    // alert('added to cart successfully');
  }

  addToFavourites(recipeId: string) {
    this.store.dispatch(
      FavouriteApiActions.addToFavouritesRequest({ recipeId }),
    );
  }
}
