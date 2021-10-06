import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
  ): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async listProduct(): Promise<Product[]> {
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

  @UseInterceptors(FileInterceptor('picture'))
  @Post('productPicture')
  async insertProfilePic(
    @UploadedFile() picture: Express.Multer.File,
    productId: string,
    @GetAuthenticatedUser() _: string,
  ) {
    return this.productService.insertPicture(picture, productId);
  }
}
