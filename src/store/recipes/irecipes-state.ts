import { Irecipe } from 'src/app/interfaces/irecipe';

export interface IrecipesState {
  recipes: ReadonlyArray<Irecipe>;
  selectedRecipe: Readonly<Irecipe> | null;
  category: string | null;
  recipeId: string | null;
  recipe: Readonly<Irecipe> | null;
  error: null | string;
  isLoading: boolean;
}
