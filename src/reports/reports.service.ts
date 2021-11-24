import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/product.repository';
import { Storage } from 'src/storage/entities/storage.entity';
import { StorageRepository } from 'src/storage/storage.repository';
import { UserRepository } from '../user/user.repository';

const mounth = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

interface StorageMounthResponse {
  mounth: number;
  mounthName: string;
  data: Storage[];
}

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(StorageRepository)
    private storageRepository: StorageRepository,
  ) {}

  async count(): Promise<any> {
    const products = await this.productRepository.countProducts();
    const users = await this.userRepository.countUsers();
    const revenues = await this.storageRepository.calcRevenues();

    const output = await this.storageRepository.findStoragesByAction(2);
    const entrys = await this.storageRepository.findStoragesByAction(1);

    const formatArray = (storage: Storage[]): StorageMounthResponse[] => {
      const array = [] as StorageMounthResponse[];
      let currentArray = [] as Storage[];

      let indice = storage[0].date.getMonth() + 1 || 0;

      storage.forEach((out) => {
        if (indice !== out.date.getMonth() + 1) {
          indice = out.date.getMonth() + 1;
          array.push({
            mounth: currentArray[0].date.getMonth() + 1,
            mounthName: mounth[currentArray[0].date.getMonth()],
            data: currentArray,
          });
          currentArray = [];
        }

        currentArray.push(out);
      });
      if (storage.length > 0) {
        array.push({
          mounth: currentArray[0].date.getMonth() + 1,
          mounthName: mounth[currentArray[0].date.getMonth()],
          data: currentArray,
        });
      }

      return array;
    };

    return {
      products,
      users,
      revenues: revenues.reduce((acc, cur) => acc + Number(cur.total_sale), 0),
      outputs: formatArray(output),
      entrys: formatArray(entrys),
    };
  }
}
