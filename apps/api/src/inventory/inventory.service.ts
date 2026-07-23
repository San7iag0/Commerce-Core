import { Injectable, NotFoundException } from '@nestjs/common';
import {
  createPhaseOneId,
  InventoryMovementRecord,
  InventoryMovementType,
  phaseOneStore,
} from '../common/phase-one-store';

export interface CreateInventoryMovementRequest {
  productId: string;
  type: InventoryMovementType;
  quantity: number;
  reason?: string;
}

@Injectable()
export class InventoryService {
  findMovements() {
    return phaseOneStore.inventoryMovements;
  }

  adjustStock(request: CreateInventoryMovementRequest) {
    const product = phaseOneStore.products.find((candidate) => candidate.id === request.productId);

    if (!product) {
      throw new NotFoundException(`Product ${request.productId} was not found.`);
    }

    const movement: InventoryMovementRecord = {
      id: createPhaseOneId('mov'),
      createdAt: new Date().toISOString(),
      ...request,
    };

    product.stock += this.stockDelta(request.type, request.quantity);
    phaseOneStore.inventoryMovements.push(movement);

    return { product, movement };
  }

  private stockDelta(type: InventoryMovementType, quantity: number) {
    if (type === 'SALE' || type === 'LOSS') {
      return -Math.abs(quantity);
    }

    return Math.abs(quantity);
  }
}
