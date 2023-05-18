import { Irecipe } from './irecipe';

export interface IcartItem {
  userId: string;
  recipeId: string;
  createdAt: string;
  recipe: Irecipe;
  quantity: number;
}
