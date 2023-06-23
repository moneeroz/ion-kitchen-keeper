import { Component, OnInit } from '@angular/core';
import { IcustomRecipe } from 'src/app/interfaces/icustom-recipe';

@Component({
  selector: 'app-custom-recipe',
  templateUrl: './custom-recipe.page.html',
  styleUrls: ['./custom-recipe.page.scss'],
})
export class CustomRecipePage implements OnInit {
  customRecipe: IcustomRecipe = { content: '', imgURL: '' };

  test: any;
  constructor() {}

  ngOnInit() {
    this.customRecipe = this.getcustomRecipe();
    this.format((this.customRecipe = this.getcustomRecipe()));
    console.log(this.customRecipe);
  }

  getcustomRecipe() {
    const data = localStorage.getItem('customRecipe');

    return data ? JSON.parse(data) : { content: '', imgURL: '' };
  }

  format(customRecipe: any) {
    let recipe = {
      name: '',
      prepTime: '',
      ingredients: '',
      directions: '',
      image: '',
    };

    // Extract recipe name
    const recipeNameRegex = /Recipe Name:\s*(.+?)\n\n/m;
    const recipeNameMatch = customRecipe.content.match(recipeNameRegex);
    recipe.name = recipeNameMatch ? recipeNameMatch[1].trim() : '';

    // Extract prep time
    const prepTimeRegex = /Prep Time:\s*(.+?)\n/i;
    const prepTimeMatch = customRecipe.content.match(prepTimeRegex);
    recipe.prepTime = prepTimeMatch ? prepTimeMatch[1].trim() : '';

    // Extract ingredients
    const ingredientsRegex = /Ingredients:\s*([\s\S]+?)\n\n/m;
    const ingredientsMatch = customRecipe.content.match(ingredientsRegex);
    recipe.ingredients = ingredientsMatch ? ingredientsMatch[1].trim() : '';

    // Extract directions
    const directionsRegex = /Directions:\s*([\s\S]+)/m;
    const directionsMatch = customRecipe.content.match(directionsRegex);
    recipe.directions = directionsMatch ? directionsMatch[1].trim() : '';

    // Set the image URL
    recipe.image = customRecipe.imgURL;

    this.test = recipe;
    console.log(recipe);
  }
}
