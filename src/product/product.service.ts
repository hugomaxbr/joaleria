import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/createProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    this.productRepository.createProduct(createProductDto);
  }
}
