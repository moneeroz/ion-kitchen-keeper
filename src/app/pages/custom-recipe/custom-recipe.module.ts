import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomRecipePageRoutingModule } from './custom-recipe-routing.module';

import { CustomRecipePage } from './custom-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomRecipePageRoutingModule
  ],
  declarations: [CustomRecipePage]
})
export class CustomRecipePageModule {}
