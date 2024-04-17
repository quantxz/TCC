import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';

@Module({
  controllers: [],
  providers: [UploadsService],
})
export class UploadsModule {}
