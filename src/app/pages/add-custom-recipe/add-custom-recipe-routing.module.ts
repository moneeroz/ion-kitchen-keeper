import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCustomRecipePage } from './add-custom-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddCustomRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCustomRecipePageRoutingModule {}
