import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Irecipe } from 'src/app/interfaces/irecipe';
import { Iuser } from 'src/app/interfaces/iuser';
import { FavouriteService } from 'src/app/services/favourite.service';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserService } from 'src/app/services/user.service';
import { IappState } from 'src/store/iapp-state';
import { hide, show } from 'src/store/loading/loading.actions';
import { IrecipesState } from 'src/store/recipes/irecipes-state';
import { RecipesApiActions } from 'src/store/recipes/recipes.actions';
import {
  recipesFeature,
  selectError,
  selectIsLoading,
  selectRecipes,
} from 'src/store/recipes/recipes.selectors';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit, OnDestroy {
  pageTitle: string = 'recipes';
  recipes: Irecipe[] = [];
  user!: Iuser;
  query!: string;

  recipeStateSubscription?: Subscription;

  filteredRecipes$: Observable<ReadonlyArray<Irecipe>>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private userService: UserService,
    private favouriteService: FavouriteService,
    private store: Store<IappState>,
    private toastController: ToastController,
  ) {
    this.filteredRecipes$ = this.store.select(selectRecipes);
    this.error$ = this.store.select(selectError);
    this.isLoading$ = this.store.select(selectIsLoading);
  }

  ngOnInit() {
    this.store.dispatch(RecipesApiActions.getRecipes());

    this.watchRecipesState();
  }

  ngOnDestroy(): void {
    if (this.recipeStateSubscription) {
      this.recipeStateSubscription.unsubscribe();
    }
  }

  ionViewWillEnter() {
    this.user = this.userService.getUserData();
  }

  private watchRecipesState() {
    this.recipeStateSubscription = this.store.select(recipesFeature).subscribe({
      next: (state) => {
        this.toggleLoading(state);

        this.onError(state);
      },
      // error: (error) => {},
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

  private toggleLoading(recipeState: IrecipesState) {
    if (recipeState.isLoading) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

  private async onError(recipeState: IrecipesState) {
    if (recipeState.error) {
      const toast = await this.toastController.create({
        message: recipeState.error,
        duration: 2000,
        position: 'bottom',
        color: 'danger',
      });
      toast.present();
    }
  }
}
