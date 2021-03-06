import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetAuthenticatedUser } from 'src/user/decorators/auth.decorator';
import { CreateProductDto } from './dto/createProductDto';
import { ParamProductIdDto } from './dto/paramProductIdDto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
    @GetAuthenticatedUser() _: string,
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async listProduct(@GetAuthenticatedUser() _: string): Promise<Product[]> {
    return this.productService.list();
  }

  @Get(':id')
  async getProduct(
    @Param(ValidationPipe) paramProductIdDto: ParamProductIdDto,
  ): Promise<Product> {
    return this.productService.listById(paramProductIdDto);
  }

  @Put(':id')
  async alterProduct(
    @Param(ValidationPipe) paramProductIdDto: ParamProductIdDto,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.updateById(createProductDto, paramProductIdDto);
  }

  @Delete(':id')
  async deleteProduct(
    @Param(ValidationPipe) paramProductIdDto: ParamProductIdDto,
  ): Promise<void> {
    return this.productService.deleteById(paramProductIdDto);
  }
}
