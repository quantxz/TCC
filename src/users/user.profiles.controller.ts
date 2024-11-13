import { Controller, Post, Body, Logger, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileDto } from './dto/profile/profile.dto';  // O DTO que você espera receber
import { UploadsService } from 'src/files configurers/uploads/uploads.service';
import { UserService } from './users.service';  // Serviço de usuário
import { FileDto } from 'file-manager-3ds/dist/types/file-type';  // O DTO para o arquivo (caso necessário)

@Controller('users-profile')
export class UsersProfileController {
  private logger: Logger = new Logger('UsersProfileController');

  constructor(
    private readonly userService: UserService, 
    private readonly uploadService: UploadsService
  ) {}

  @Post("a")
  @UseInterceptors(FileInterceptor('file'))  // 'file' corresponde ao nome no FormData
  async registerProfile(
    @UploadedFile() file: FileDto,  // O arquivo enviado
    @Body() data: ProfileDto,  // Dados do perfil como bio, skills, etc.
    @Res() res: Response
  ) {
    if (!file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    try {
      // Processa o arquivo de imagem
      const profilePicPath = await this.uploadService.filePipe(file, "Profile");
      const profileImageUrl = `${"http://localhost:3000/" + profilePicPath}`; 
      // Salva o perfil no banco de dados (ou qualquer outra lógica necessária)
      const response = await this.userService.profileResgiter(data, profileImageUrl);

      return res.status(200).json({
        message: 'Perfil registrado com sucesso',
        response,
      });
    } catch (error) {
      this.logger.error('Erro ao registrar perfil', error.stack);
      return res.status(500).json({
        message: 'Erro ao registrar perfil',
        error: error.message,
      });
    }
  }
}
