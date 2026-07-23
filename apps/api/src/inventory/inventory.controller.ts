import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateInventoryMovementRequest, InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('movements')
  findMovements() {
    return this.inventoryService.findMovements();
  }

  @Post('movements')
  adjustStock(@Body() request: CreateInventoryMovementRequest) {
    return this.inventoryService.adjustStock(request);
  }
}
