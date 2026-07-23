import { Injectable, NotFoundException } from '@nestjs/common';
import { createPhaseOneId, PaymentMethod, phaseOneStore, SaleRecord } from '../common/phase-one-store';

export interface CreateSaleItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateSaleRequest {
  cashierId?: string;
  paymentMethod: PaymentMethod;
  items: CreateSaleItemRequest[];
}

@Injectable()
export class SalesService {
  findAll() {
    return phaseOneStore.sales;
  }

  create(request: CreateSaleRequest) {
    const items = request.items.map((item) => {
      const product = phaseOneStore.products.find((candidate) => candidate.id === item.productId);

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} was not found.`);
      }

      product.stock -= item.quantity;

      return {
        id: createPhaseOneId('item'),
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal: product.price * item.quantity,
      };
    });

    const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
    const tax = Number((subtotal * 0.19).toFixed(2));
    const sale: SaleRecord = {
      id: createPhaseOneId('sale'),
      cashierId: request.cashierId ?? 'user_admin',
      subtotal,
      tax,
      total: Number((subtotal + tax).toFixed(2)),
      paymentMethod: request.paymentMethod,
      status: 'COMPLETED',
      items,
      createdAt: new Date().toISOString(),
    };

    phaseOneStore.sales.push(sale);
    return sale;
  }
}
