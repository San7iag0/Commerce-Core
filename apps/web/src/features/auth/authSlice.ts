import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/domain';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string }>) {
      state.user = {
        id: 'demo-user',
        name: 'Demo Cashier',
        email: action.payload.email,
        role: 'CASHIER'
      };
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
