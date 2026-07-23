import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';
import type { InventoryMovement, InventoryMovementType } from '../../types/domain';

const initialState: InventoryMovement[] = [];

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    recordMovement: {
      reducer(state, action: PayloadAction<InventoryMovement>) {
        state.unshift(action.payload);
      },
      prepare(input: Omit<InventoryMovement, 'id' | 'createdAt'> & { type: InventoryMovementType }) {
        return { payload: { ...input, id: nanoid(), createdAt: new Date().toISOString() } };
      }
    }
  }
});

export const { recordMovement } = inventorySlice.actions;
export const inventoryReducer = inventorySlice.reducer;
