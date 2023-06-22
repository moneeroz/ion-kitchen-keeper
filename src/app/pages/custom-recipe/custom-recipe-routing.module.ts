import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomRecipePage } from './custom-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: CustomRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomRecipePageRoutingModule {}
