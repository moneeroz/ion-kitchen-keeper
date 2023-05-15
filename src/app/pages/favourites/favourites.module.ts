import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
import { RecipeComponentModule } from 'src/app/components/recipe/recipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule,
    RecipeComponentModule,
  ],
  declarations: [FavouritesPage],
})
export class FavouritesPageModule {}
