export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'COOK';
export type PaymentMethod = 'CASH' | 'CARD';
export type InventoryMovementType = 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'LOSS' | 'RETURN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  minimumStock: number;
  isActive: boolean;
}

export interface InventoryMovement {
  id: string;
  productId: string;
  productName: string;
  type: InventoryMovementType;
  quantity: number;
  reason: string;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  cashier: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: 'COMPLETED' | 'CANCELLED';
  items: SaleItem[];
  createdAt: string;
}
