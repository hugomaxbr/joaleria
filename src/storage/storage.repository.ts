import { EntityRepository, Repository } from 'typeorm';
import { Storage } from './entities/storage.entity';
import { CreateStorageDto } from './dto/CreateStorageDto';

@EntityRepository(Storage)
export class StorageRepository extends Repository<Storage> {
  async createStorage(createStorageDto: CreateStorageDto): Promise<Storage> {
    const storage = this.create(createStorageDto);

    await this.save(storage);

    return storage;
  }
}
