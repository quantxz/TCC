import { UserDto } from './dto/user.dto';
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../services/configs/prisma.service';
import { RedisService } from '../services/configs/redis.service';
import { InvalidTypeException, UserNotFoundException } from '../errs/exceptions';

@Injectable()
export class UserService {
  private logger: Logger = new Logger('UsersServices');
  constructor(private readonly prismaService: PrismaService, private readonly redisService: RedisService) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const user: CreateUserDto = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          surname: createUserDto.surname,
          email: createUserDto.email,
          password: createUserDto.password,
          nickname: createUserDto.nickname
        }
      });

      return user;
    } catch (error) {
      this.logger.error("Erro durante a criação do usuario: " + error)
      throw new Error("Erro durante a criação do usuário: " + error);
    }
  }

  async findAll() {
    try {
      const users: UserDto[] = await this.prismaService.user.findMany()

      return users;
    } catch (error) {
      this.logger.error("Erro durante a procura pelos usuarios: " + error)
      throw new Error("Erro durante a recuperação de dados dos usuarios")
    }
  }

  async findOne(UserDto: UserDto) {
    try {
      const user: UserDto = await this.prismaService.user.findUnique({
        where: {
          nickname: UserDto.nickname,
          email: UserDto.email,
          password: UserDto.password
        }
      })

      if (user) {
        return user;
      } else {
        throw new UserNotFoundException();
      }
    } catch (error) {
      this.logger.error("Erro durante a procura pelo usuario: " + error)
      throw new Error("erro durante a procura do usuario: " + error)
    }
  }

  async findUnique(type: string, userDto: UserDto) {
    let user: UserDto;
    try {
      switch (type) {
        case "nickname":
          user = await this.prismaService.user.findUnique({
            where: {
              nickname: userDto.nickname,
              password: userDto.password
            }
          })

          break;
        case "email":
          user = await this.prismaService.user.findUnique({
            where: {
              email: userDto.email,
              password: userDto.password
            }
          })

          break;
        default:
          throw new UserNotFoundException();
      }

      return user;

    } catch (error) {
      this.logger.error("Erro durante a procura pelo usuario: " + error)
      throw new Error("Erro durante a procura pelo usuario: " + error)
    }
  }

  async update(updateType: string, updateUserDto: UpdateUserDto) {
    let userUpdated: UserDto;
    try {
      switch (updateType) {
        case "email":
          userUpdated = await this.prismaService.user.update({
            where: {
              nickname: updateUserDto.nickname,
              password: updateUserDto.password,
              surname: updateUserDto.surname
            },
            data: {
              email: updateUserDto.email
            }
          })

          break;
        case "password":
          userUpdated = await this.prismaService.user.update({
            where: {
              nickname: updateUserDto.nickname,
              email: updateUserDto.email,
              surname: updateUserDto.surname
            },
            data: {
              password: updateUserDto.password
            }
          })

          break;
        case "nickname":
          const user: UserDto = await this.prismaService.user.findUnique({
            where: {
              email: updateUserDto.email,
              password: updateUserDto.password,
              surname: updateUserDto.surname
            }
          })

          if (user.nickname !== updateUserDto.nickname) {
            userUpdated = await this.prismaService.user.update({
              where: {
                nickname: user.nickname,
              },
              data: {
                nickname: updateUserDto.nickname,
              }
            });

          }

          break;
        default:
          throw new InvalidTypeException();
      }
      return userUpdated
    } catch (error) {
      this.logger.error("Erro durante a atualização dos dados do usuario: " + error)
      throw new Error("Erro durante a atualização dos dados do usuario: " + error)
    }
  }

  async remove(userDto: UserDto) {
    try {
      const exUser: UserDto = await this.prismaService.user.delete({
        where: {
          nickname: userDto.nickname,
          email: userDto.email,
          password: userDto.password,
          name: userDto.name,
          surname: userDto.surname
        }
      })

      return exUser
    } catch (error) {
      this.logger.error("Erro durante a exclusão do usuario: " + error)
      throw new Error("Erro durante a exclusão do usuario: " + error)
    }
  }

  async FindMany() {
    try {
      const cachedUsers = await this.redisService.get('users');

      if (!cachedUsers) {
        const users = await this.prismaService.user.findMany();

        await this.redisService.set('users', JSON.stringify(users), 'EX', 15)
        console.log('\x1b[36m%s\x1b[0m', 'FROM PRISMA')
        return users
      }

      console.log('\x1b[36m%s\x1b[0m', 'FROM CACHE')

      return JSON.parse(cachedUsers);
    } catch (error) {
      this.logger.error("Erro durante a procura pelo usuario no redis: " + error)
      throw new Error("Erro durante a procura pelo usuario no redis: " + error)
    }
  }

  async findByNickname(nickname: string) {
    try {
      const user: UserDto = await this.prismaService.user.findUnique({
        where: {
          nickname
        }
      })

      return user;
    } catch (error) {
      this.logger.error("Erro durante a procura pelo usuario através do nickname: " + error)
      throw new Error("Erro durante a procura pelo usuario através do nickname: " + error)
    }
  }
}
