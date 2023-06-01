import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { RecipeComponentModule } from 'src/app/components/recipe/recipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    HeaderModule,
    RecipeComponentModule,
  ],
  declarations: [CategoriesPage],
})
export class CategoriesPageModule {}
