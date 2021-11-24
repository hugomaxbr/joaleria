import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { GetAuthenticatedUser } from 'src/user/decorators/auth.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseInterceptors(ClassSerializerInterceptor)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('count')
  async countData(@GetAuthenticatedUser() _: string): Promise<any> {
    return this.reportsService.count();
  }
}
