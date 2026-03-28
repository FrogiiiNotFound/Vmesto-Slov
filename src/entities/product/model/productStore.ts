import type { Product } from '@shared/types/products/product';
import { create } from 'zustand';

type ProductsState = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (products) => set({ products: products }),
}));
