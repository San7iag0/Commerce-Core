import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { InventoryModule } from './inventory/inventory.module';
import { ProductsModule } from './products/products.module';
import { ReportsModule } from './reports/reports.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [AuthModule, ProductsModule, InventoryModule, SalesModule, ReportsModule],
})
export class AppModule {}
