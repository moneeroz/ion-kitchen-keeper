import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { Iuser } from 'src/app/interfaces/iuser';
import { FavouriteService } from 'src/app/services/favourite.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { CategoryActions } from 'src/store/category/category.actions';
import { selectCategoryItems } from 'src/store/category/category.selectors';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  pageTitle: string = 'catagories';
  recipes: Irecipe[] = [];

  recipes$: Observable<Irecipe[]>;

  // user!: Iuser;
  constructor(
    // private recipeService: RecipeService,
    private router: Router,
    // private userService: UserService,
    // private favouriteService: FavouriteService,
    private store: Store<IappState>,
  ) {
    this.recipes$ = this.store.select(selectCategoryItems);
  }

  ngOnInit() {
    // this.user = this.userService.getUserData();
    // this.recipeService.getRecipesByCategory('chicken').subscribe({
    //   next: (recipes) => {
    //     this.recipes = recipes;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.getRecipesByCategory('chicken');
  }

  getRecipesByCategory(category: string) {
    // this.recipeService.getRecipesByCategory(category).subscribe({
    //   next: (recipes) => {
    //     this.recipes = recipes;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });

    this.store.dispatch(
      CategoryActions.getRecipesByCategoryRequest({ category }),
    );
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }

  onFavourite(recipe_id: string) {
    // console.log(recipe_id);
    // this.favouriteService.addToFavourites(this.user.id, recipe_id).subscribe({
    //   next: (result) => {
    //     console.log(result);
    //     alert('Recipe added to Favourites');
    //   },
    //   error: (err) => {
    //     console.log(err);
    //     alert('Recipe is already in Favourites');
    //   },
    // });
  }
}
