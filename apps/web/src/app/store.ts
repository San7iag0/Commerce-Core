import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/authSlice';
import { inventoryReducer } from '../features/inventory/inventorySlice';
import { productsReducer } from '../features/products/productsSlice';
import { salesReducer } from '../features/sales/salesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    inventory: inventoryReducer,
    sales: salesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
