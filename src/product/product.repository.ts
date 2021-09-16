import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProductDto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    const profile = this.create(createProductDto);

    await this.save(profile);
  }

  async listAll(): Promise<Product[]> {
    return this.find();
  }
}
