import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCustomRecipePageRoutingModule } from './add-custom-recipe-routing.module';

import { AddCustomRecipePage } from './add-custom-recipe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCustomRecipePageRoutingModule,
  ],
  declarations: [AddCustomRecipePage],
})
export class AddCustomRecipePageModule {}
