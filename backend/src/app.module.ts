import { Module } from '@nestjs/common';

import { ConfigModule } from './infrastructure/config';
import { PrismaModule } from './infrastructure/database/prisma';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
  ],
})
export class AppModule {}
