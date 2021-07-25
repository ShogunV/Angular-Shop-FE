export type Product = {
  id: number;
  title: string;
  description: string;
  image: File | string;
  price: number;
  discount: number;
  category: string;
  category_id: number;
};
