import { Irecipe } from './irecipe';

export interface Ifavourite {
  userId: string;
  recipeId: string;
  createdAt: string;
  recipe: Irecipe;
}
