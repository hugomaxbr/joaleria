import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { GetAuthenticatedUser } from 'src/user/decorators/auth.decorator';
import { CreateStorageDto } from './dto/CreateStorageDto';
import { Storage } from './entities/storage.entity';
import { StorageService } from './storage.service';

@Controller('storage')
@UseInterceptors(ClassSerializerInterceptor)
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  async createStorage(
    @Body(ValidationPipe) createStorageDto: CreateStorageDto,
    @GetAuthenticatedUser() user_id: string,
  ): Promise<Storage> {
    return this.storageService.create(createStorageDto, user_id);
  }

  @Get()
  async listStorage(
    @GetAuthenticatedUser() _: string,
    @Query('action') action: number,
  ): Promise<Storage[]> {
    if (!action) {
      return this.storageService.list();
    }

    return this.storageService.findStoragesByAction(action);
  }
}
