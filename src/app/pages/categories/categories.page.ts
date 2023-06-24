import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { CategoryActions } from 'src/store/category/category.actions';
import { selectCategoryItems } from 'src/store/category/category.selectors';
import { FavouriteApiActions } from 'src/store/favourites/favourites.actions';
import { IappState } from 'src/store/iapp-state';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  pageTitle: string = 'catagories';

  recipes$: Observable<Irecipe[]>;

  constructor(
    private router: Router,

    private store: Store<IappState>,
  ) {
    this.recipes$ = this.store.select(selectCategoryItems);
  }

  ngOnInit() {
    this.getRecipesByCategory('chicken');
  }

  getRecipesByCategory(category: string) {
    this.store.dispatch(
      CategoryActions.getRecipesByCategoryRequest({ category }),
    );
  }

  onView(recipe_id: string) {
    console.log(recipe_id);
    this.router.navigate(['recipe', recipe_id]);
  }

  addToFavourites(recipeId: string) {
    this.store.dispatch(
      FavouriteApiActions.addToFavouritesRequest({ recipeId }),
    );
  }
}
