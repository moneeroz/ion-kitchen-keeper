import { Ifavourite } from 'src/app/interfaces/ifavourite';

export interface IfavouritesState {
  items: Ifavourite[];
  isLoading: boolean;
  error: string | null;
}
