import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/createProductDto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.create(createProductDto);

    const newProduct = await this.save(product);

    return newProduct;
  }

  async listAll(): Promise<Product[]> {
    return this.find();
  }

  async listById(id: string): Promise<Product> {
    return this.findOne(id);
  }

  async updateProduct(data: Product): Promise<Product> {
    return this.save(data);
  }
}
