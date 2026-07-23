import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/domain';

const initialState: Product[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    description: 'House coffee',
    sku: 'BEV-COFFEE',
    barcode: '100000001',
    category: 'Beverages',
    price: 5,
    cost: 1.5,
    stock: 48,
    minimumStock: 10,
    isActive: true
  },
  {
    id: 'tea',
    name: 'Tea',
    sku: 'BEV-TEA',
    category: 'Beverages',
    price: 4,
    cost: 1,
    stock: 32,
    minimumStock: 8,
    isActive: true
  },
  {
    id: 'burger',
    name: 'Burger',
    sku: 'FOOD-BURGER',
    category: 'Food',
    price: 12,
    cost: 5,
    stock: 18,
    minimumStock: 5,
    isActive: true
  },
  {
    id: 'pizza',
    name: 'Pizza Slice',
    sku: 'FOOD-PIZZA',
    category: 'Food',
    price: 8,
    cost: 3,
    stock: 5,
    minimumStock: 6,
    isActive: true
  }
];

export type ProductInput = Omit<Product, 'id' | 'isActive'> & { isActive?: boolean };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action: PayloadAction<Product>) {
        state.push(action.payload);
      },
      prepare(product: ProductInput) {
        return { payload: { ...product, id: nanoid(), isActive: product.isActive ?? true } };
      }
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.findIndex((product) => product.id === action.payload.id);
      if (index >= 0) state[index] = action.payload;
    },
    adjustProductStock(state, action: PayloadAction<{ productId: string; quantityDelta: number }>) {
      const product = state.find((item) => item.id === action.payload.productId);
      if (product) product.stock += action.payload.quantityDelta;
    }
  }
});

export const { addProduct, updateProduct, adjustProductStock } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;
