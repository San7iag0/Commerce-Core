import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSaleRequest, SalesService } from './sales.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Post()
  create(@Body() request: CreateSaleRequest) {
    return this.salesService.create(request);
  }
}
