import { CartProduct } from './CartProduct.model';

export type Order = {
  id: number;
  user: string;
  created_at: string;
  total: number;
  data: CartProduct[];
};
