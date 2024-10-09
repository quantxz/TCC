import { Response } from 'express';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { sendEmailProducerService } from '../jobs/mail/sendEmail-producer.service';
import { UserProfileService } from './users.profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileDto } from './dto/profile/profile.dto';
import { FileDto } from 'file-manager-3ds/dist/types/file-type';
import { UploadsService } from 'src/files configurers/uploads/uploads.service';

@Controller('users-profile')
export class UsersProfileController {
    private logger: Logger = new Logger('UsersController');

    constructor(
        private readonly userProfileService: UserProfileService,
        private readonly mailService: sendEmailProducerService,
        private readonly uploadsService: UploadsService
    ) { }

    @Post('update')
    @UseInterceptors(FileInterceptor('file'))
    async updateProfile(@Body() profileDto: ProfileDto, @Res() res: Response,  @UploadedFile() file?: FileDto) {
        try {
            let profilePic;
            
            if(file) {
                const result = await this.uploadsService.filePipe(file);
                const profileImageUrl = `${process.env.SERVER_URL + result}`;
                profilePic = profileImageUrl;
            }

            const userDtoInstance = plainToClass(ProfileDto, profileDto);
            const errors = await validate(userDtoInstance);

            if (errors.length > 0) {
                return res.status(400).json({ message: 'Erro de validação', errors });
            }

            const user = await this.userProfileService.UpdateProfile(profileDto, profilePic);
            return res.status(200).json({
                infosDoUsuario: profileDto,
                usuario: user
            })

        } catch (error) {
            this.logger.error("\nErro encontrado: " + error + "\nErro no Controlador user.profile");
            return res.status(400).json({
                msgDeErro: error
            })
        }
    }
}
