import { Product } from './Product.model';

export interface CartProduct extends Product {
  quantity: number;
}
