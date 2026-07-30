import { Module } from '@nestjs/common';

import { ConfigModule } from './infrastructure/config';
import { PrismaModule } from './infrastructure/database/prisma';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    HealthModule
  ],
})
export class AppModule {}
