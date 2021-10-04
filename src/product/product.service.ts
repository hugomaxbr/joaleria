import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProductDto';
import { ParamProductIdDto } from './dto/paramProductIdDto';
import { ProductRepository } from './product.repository';

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

  async deleteById(paramProductIdDto: ParamProductIdDto): Promise<void> {
    const product = await this.productRepository.listById(paramProductIdDto.id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await this.productRepository.deleteProduct(product);
  }
}
