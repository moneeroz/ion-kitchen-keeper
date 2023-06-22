import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes',
    pathMatch: 'full',
  },
  {
    path: 'loading',
    loadChildren: () =>
      import('./pages/loading/loading.module').then((m) => m.LoadingPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule,
      ),
  },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./pages/recipes/recipes.module').then((m) => m.RecipesPageModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./pages/categories/categories.module').then(
        (m) => m.CategoriesPageModule,
      ),
  },
  {
    path: 'favourites',
    loadChildren: () =>
      import('./pages/favourites/favourites.module').then(
        (m) => m.FavouritesPageModule,
      ),
    canActivate: [AuthguardService],
  },
  {
    path: 'recipe/:recipe_id',
    loadChildren: () =>
      import('./pages/recipe/recipe.module').then((m) => m.RecipePageModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./pages/cart/cart.module').then((m) => m.CartPageModule),
    canActivate: [AuthguardService],
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./pages/shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListPageModule,
      ),
    canActivate: [AuthguardService],
  },
  {
    path: 'custom-recipe',
    loadChildren: () => import('./pages/custom-recipe/custom-recipe.module').then( m => m.CustomRecipePageModule)
  },
  {
    path: 'add-custom-recipe',
    loadChildren: () => import('./pages/add-custom-recipe/add-custom-recipe.module').then( m => m.AddCustomRecipePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
