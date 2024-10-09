import { UserDto } from './dto/user.dto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../services/configs/prisma.service';
import { RedisService } from '../services/configs/redis.service';
import { InvalidTypeException, UserNotFoundException } from '../errs/exceptions';
import { ProfileDto } from './dto/profile/profile.dto';
import { switchAll } from 'rxjs';

@Injectable()
export class UserProfileService {
  private logger: Logger = new Logger('UsersServices');
  constructor(private readonly prismaService: PrismaService) { }
  
  async ResgisterProfile(profileDto: ProfileDto, profilePic: string) {
    try {
        const user = await this.prismaService.user.update({
            where: {
                nickname: profileDto.userNick
            },
            data: {
                bio: profileDto.bio,
                skills: profileDto.skills,
                profilePic: profilePic
            }
        })

        return user
    } catch (error) {
        this.logger.error("\nErro encontrado: " + error + "\nErro no ResgisterProfile Service");
    }
  }

  async UpdateProfile(profileDto: ProfileDto, profilePic: string) {
    try {
        const user = await this.prismaService.user.update({
            where: {
                nickname: profileDto.userNick
            },
            data: {
                bio: profileDto.bio,
                skills: profileDto.skills,
                profilePic: profilePic
            }
        })

        return user
    } catch (error) {
        this.logger.error("\nErro encontrado: " + error + "\nErro no ResgisterProfile Service");
    }
  }


}
