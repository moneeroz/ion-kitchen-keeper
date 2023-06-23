import { IcartItem } from 'src/app/interfaces/icart';

export interface IcartState {
  items: IcartItem[];
  isLoading: boolean;
  error: string | null;
}
