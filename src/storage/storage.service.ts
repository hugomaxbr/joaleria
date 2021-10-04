import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/product.repository';
import { CreateStorageDto } from './dto/CreateStorageDto';
import { StorageRepository } from './storage.repository';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,

    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async create(
    createStorageDto: CreateStorageDto,
    user_id: string,
  ): Promise<any> {
    const product = await this.productRepository.listById(
      createStorageDto.product_id,
    );

    if (!product) {
      throw new NotFoundException('Produto nâo encontrado');
    }

    if (createStorageDto.action === 2) {
      if (product.current_quantity < createStorageDto.product_quantity) {
        throw new ConflictException(
          'Quantidade da saída de produtos nâo deve ser menor que o estoque',
        );
      }

      product.current_quantity -= createStorageDto.product_quantity;
    } else {
      product.current_quantity += createStorageDto.product_quantity;
    }

    this.productRepository.updateProduct(product);

    const total_sale =
      createStorageDto.product_quantity * parseFloat(product.value);

    const storage = Object.assign(createStorageDto, {
      total_sale,
      user_id,
    });

    return this.storageRepository.createStorage(storage);
  }
}
