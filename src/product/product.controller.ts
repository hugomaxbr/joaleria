import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<void> {
    await this.productService.create(createProductDto);
  }

  @Get()
  async listProfiles(): Promise<void> {
    console.log('Teste');
  }
}
