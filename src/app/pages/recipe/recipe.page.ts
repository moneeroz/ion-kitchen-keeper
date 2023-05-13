import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Irecipe } from 'src/app/interfaces/irecipe';
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
}