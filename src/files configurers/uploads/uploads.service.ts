import { Injectable } from '@nestjs/common';
import { FileDto } from './dto/file-dto';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as crypto from 'crypto';
import { stringify } from 'querystring';


@Injectable()
export class UploadsService {
    public folderPostsPath = path.join(__dirname, "..", "..", "..", "static", "posts-images");
    public folderCommentsPath = path.join(__dirname, "..", "..", "..", "static", "comments-images");

    imageTypesList: string[] = [
        "jpg", "gif", "png", "svg", "webp", "raw", "tiff", "bmp", "pdf", "jpeg",
        "heif", "heic", "indd", "ai", "psd", "eps", "dng", "cr2", "nef", "orf", "sr2"
    ];
    
    ReadExtension(fileName: string) {
        const originalName = fileName.toLowerCase()
        const extension: string[] = originalName.split(".");

        return extension[extension.length - 1];
    }

    async filePipe<T extends string>(file: FileDto): Promise<string> {
        const fileType = this.ReadExtension(file.originalname);
        const fileWeightInMb = file.size / (1024 * 1024);
        //inferindo o valor de T no type
        const type: T = null!;

        switch (type) {
            case "Comment":
                if (fileWeightInMb < 20) {
                    //Criando um novo nome de arquivo usando valores que não se repetem
                    const timestamp = new Date().getTime();
                    const hash = crypto.randomBytes(8).toString('hex');
                    const fileName = `${timestamp}_${hash}.${fileType}`;



                    // Garantindo que a pasta de destino existe, se não, criando-a
                    await fs.ensureDir(this.folderCommentsPath);

                    await fs.writeFile(path.join(this.folderCommentsPath, fileName), file.buffer);
                    
                    return fileName;
                }
                break;
            default:

                if (fileWeightInMb < 20) {
                    //Criando um novo nome de arquivo usando valores que não se repetem
                    const timestamp = new Date().getTime();
                    const hash = crypto.randomBytes(8).toString('hex');
                    const fileName = `${timestamp}_${hash}.${fileType}`;



                    // Garantindo que a pasta de destino existe, se não, criando-a
                    await fs.ensureDir(this.folderPostsPath);

                    await fs.writeFile(path.join(this.folderPostsPath, fileName), file.buffer);

                    return fileName;
                }
                break;
        }

    }
}
