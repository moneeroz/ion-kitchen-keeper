import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [RecipeComponent],
  imports: [CommonModule, IonicModule],
  exports: [RecipeComponent],
})
export class RecipeComponentModule {}
