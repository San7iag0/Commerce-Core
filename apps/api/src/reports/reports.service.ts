import { Injectable } from '@nestjs/common';
import { phaseOneStore } from '../common/phase-one-store';

@Injectable()
export class ReportsService {
  summary() {
    const completedSales = phaseOneStore.sales.filter((sale) => sale.status === 'COMPLETED');
    const revenue = completedSales.reduce((total, sale) => total + sale.total, 0);
    const lowStockProducts = phaseOneStore.products.filter(
      (product) => product.stock <= product.minimumStock,
    );

    return {
      salesCount: completedSales.length,
      revenue: Number(revenue.toFixed(2)),
      productsCount: phaseOneStore.products.length,
      lowStockProducts,
    };
  }
}
