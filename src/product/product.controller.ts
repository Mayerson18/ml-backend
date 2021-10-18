import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductResponseDTO } from './dtos/product-response.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getProducts(@Query() query): Promise<ProductResponseDTO | {statusText: string}> {
    return this.productService.getProducts(query);
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<ProductResponseDTO | {statusText: string}> {
    return this.productService.getProductById(id);
  }
}
