import { IcustomRecipe } from 'src/app/interfaces/icustom-recipe';

export interface IcustomRecipeState {
  isLoading: boolean;
  recipe: IcustomRecipe | null;
  error: string | null;
}
