export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'COOK';
export type InventoryMovementType = 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'LOSS' | 'RETURN';
export type PaymentMethod = 'CASH' | 'CARD';
export type SaleStatus = 'COMPLETED' | 'CANCELLED';

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
}

export interface CategoryRecord {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export interface ProductRecord {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  categoryId: string;
  price: number;
  cost: number;
  stock: number;
  minimumStock: number;
  isActive: boolean;
}

export interface InventoryMovementRecord {
  id: string;
  productId: string;
  type: InventoryMovementType;
  quantity: number;
  reason?: string;
  createdAt: string;
}

export interface SaleItemRecord {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface SaleRecord {
  id: string;
  cashierId: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: SaleStatus;
  items: SaleItemRecord[];
  createdAt: string;
}

export interface PhaseOneStore {
  users: UserRecord[];
  categories: CategoryRecord[];
  products: ProductRecord[];
  inventoryMovements: InventoryMovementRecord[];
  sales: SaleRecord[];
}

export const phaseOneStore: PhaseOneStore = {
  users: [
    {
      id: 'user_admin',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN',
      isActive: true,
    },
  ],
  categories: [
    {
      id: 'cat_beverages',
      name: 'Beverages',
      description: 'Ready-to-sell drinks.',
      isActive: true,
    },
  ],
  products: [
    {
      id: 'prod_coffee',
      name: 'Coffee',
      description: 'House coffee.',
      sku: 'COFFEE-001',
      barcode: '000000000001',
      categoryId: 'cat_beverages',
      price: 3.5,
      cost: 1.25,
      stock: 50,
      minimumStock: 10,
      isActive: true,
    },
  ],
  inventoryMovements: [],
  sales: [],
};

export function createPhaseOneId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
