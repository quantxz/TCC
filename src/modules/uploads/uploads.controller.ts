import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from './dto/file-dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post("/uploads")
  @UseInterceptors(FileInterceptor('file'))
  async UploadedFile(@UploadedFile() file: FileDto) {
    
    const result = await this.uploadsService.upload(file)
    return result
  }


}
