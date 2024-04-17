import { Injectable } from '@nestjs/common';
import { FileDto } from './dto/file-dto';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';


@Injectable()
export class UploadsService {
    public folderPath = path.join(__dirname, "..", "..", "..", "static", "posts-images");
    
    imageTypesList: string[] = ["jpg", "gif", "png", "svg", "webp", "raw", "tiff", "bmp", "pdf"]

    ReadExtension(fileName: string) {
        const originalName = fileName.toLowerCase()
        const extension: string[] = originalName.split(".");

        return extension[extension.length - 1];
    }

    async filePipe(file: FileDto): Promise<string> {
        const fileType = this.ReadExtension(file.originalname);
        const fileWeightInMb = file.size / (1024 * 1024);
        
        if (fileWeightInMb < 20) {
            //Criando um novo nome de arquivo usando valores que não se repetem
            const timestamp = new Date().getTime();
            const hash = crypto.randomBytes(8).toString('hex');
            const fileName = `${timestamp}_${hash}.${fileType}`;



            // Garantindo que a pasta de destino existe, se não, criando-a
            await fs.ensureDir(this.folderPath);

            await fs.writeFile(path.join(this.folderPath, fileName), file.buffer);

            return fileName;
        } else {
            throw new Error("File weight exceeds the maximum allowed limit.");
        }
    }

}
