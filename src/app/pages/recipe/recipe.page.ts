import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { CartService } from 'src/app/services/cart.service';
import { RecipeService } from 'src/app/services/recipe.service';

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
    private cartService: CartService,
  ) {}

  ionViewWillEnter() {
    this.recipe_id = this.route.snapshot.paramMap.get('recipe_id');
    // console.log(this.recipe_id);
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

  addToCart(recipe: Irecipe) {
    this.cartService.addToCart({
      id: recipe.id,
      name: recipe.name,
      image: recipe.image,
      ingredients: recipe.ingredients,
      category_id: recipe.category_id,
      quantity: 1,
    });
  }
}
