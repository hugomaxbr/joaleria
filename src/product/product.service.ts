import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProductDto';
import { Product } from 'src/product/entities/product.entity';
import { ParamProductIdDto } from './dto/paramProductIdDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async list(): Promise<Product[]> {
    return this.productRepository.listAll();
  }

  async listById(paramProductIdDto: ParamProductIdDto): Promise<Product> {
    return this.productRepository.listById(paramProductIdDto.id);
  }

  async updateById(
    createProductDto: CreateProductDto,
    paramProductIdDto: ParamProductIdDto,
  ): Promise<Product> {
    const product = await this.productRepository.listById(paramProductIdDto.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const changedProduct = Object.assign(product, createProductDto);

    return await this.productRepository.updateProduct(changedProduct);
  }
}
