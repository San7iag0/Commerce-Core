import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, PaymentMethod, Sale } from '../../types/domain';

export interface SalesState {
  cart: CartItem[];
  history: Sale[];
  taxRate: number;
}

const initialState: SalesState = {
  cart: [],
  history: [],
  taxRate: 0.08
};

export const calculateCartTotals = (items: CartItem[], taxRate: number) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = Number((subtotal * taxRate).toFixed(2));
  return { subtotal, tax, total: Number((subtotal + tax).toFixed(2)) };
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const existingItem = state.cart.find((item) => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity ?? 1;
      } else {
        state.cart.push({ ...action.payload, quantity: action.payload.quantity ?? 1 });
      }
    },
    changeCartQuantity(state, action: PayloadAction<{ productId: string; quantity: number }>) {
      const item = state.cart.find((entry) => entry.productId === action.payload.productId);
      if (!item) return;
      item.quantity = Math.max(1, action.payload.quantity);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
    },
    clearCart(state) {
      state.cart = [];
    },
    completeSale(state, action: PayloadAction<{ cashier: string; paymentMethod: PaymentMethod }>) {
      if (state.cart.length === 0) return;
      const totals = calculateCartTotals(state.cart, state.taxRate);
      state.history.unshift({
        id: nanoid(),
        cashier: action.payload.cashier,
        paymentMethod: action.payload.paymentMethod,
        status: 'COMPLETED',
        createdAt: new Date().toISOString(),
        items: state.cart.map((item) => ({
          productId: item.productId,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.price * item.quantity
        })),
        ...totals
      });
      state.cart = [];
    }

  }
});

export const { addToCart, changeCartQuantity, removeFromCart, clearCart, completeSale } = salesSlice.actions;
export const salesReducer = salesSlice.reducer;
