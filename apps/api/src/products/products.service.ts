import { Injectable, NotFoundException } from '@nestjs/common';
import { createPhaseOneId, phaseOneStore, ProductRecord } from '../common/phase-one-store';

export type CreateProductRequest = Omit<ProductRecord, 'id' | 'isActive'> & {
  isActive?: boolean;
};

@Injectable()
export class ProductsService {
  findAll() {
    return phaseOneStore.products;
  }

  findOne(id: string) {
    const product = phaseOneStore.products.find((candidate) => candidate.id === id);

    if (!product) {
      throw new NotFoundException(`Product ${id} was not found.`);
    }

    return product;
  }

  create(request: CreateProductRequest) {
    const product: ProductRecord = {
      id: createPhaseOneId('prod'),
      isActive: request.isActive ?? true,
      ...request,
    };

    phaseOneStore.products.push(product);
    return product;
  }
}
