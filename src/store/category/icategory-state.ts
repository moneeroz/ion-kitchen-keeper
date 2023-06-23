import { Irecipe } from 'src/app/interfaces/irecipe';

export interface IcategoryState {
  categoryItems: Irecipe[];
  isLoading: boolean;
  error: string | null;
}
