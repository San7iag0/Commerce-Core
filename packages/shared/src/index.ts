export type UserRole = 'ADMIN' | 'MANAGER' | 'CASHIER' | 'WAITER' | 'COOK';
export type PaymentMethod = 'CASH' | 'CARD';
export type InventoryMovementType = 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'LOSS' | 'RETURN';

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
