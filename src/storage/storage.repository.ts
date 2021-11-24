import { EntityRepository, MoreThanOrEqual, Repository } from 'typeorm';
import { Storage } from './entities/storage.entity';
import { CreateStorageDto } from './dto/CreateStorageDto';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  async createStorage(createStorageDto: CreateStorageDto): Promise<Storage> {
    const storage = this.create(createStorageDto);

    await this.save(storage);

    return storage;
  }

  async listAll(): Promise<Storage[]> {
    return this.find({ relations: ['user', 'product'] });
  }

  async findStoragesByAction(action: number): Promise<Storage[]> {
    return this.find({
      relations: ['user', 'product'],
      where: { action: action },
      order: { date: 'ASC' },
    });
  }

  async calcRevenues(): Promise<Storage[]> {
    const date = new Date();

    console.log(new Date(date.getFullYear(), date.getMonth(), 1));

    return this.find({
      where: {
        action: 2,
        date: MoreThanOrEqual(new Date(date.getFullYear(), date.getMonth(), 1)),
      },
    });
  }
}
