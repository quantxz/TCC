import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from './dto/user.dto';
// import { RedisService } from 'src/services/redis.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService, /*private readonly redisService: RedisService*/) {}

  async create(createUserDto: CreateUserDto) {
    const user: CreateUserDto = await this.prismaService.user.create({
      data: {
        name:     createUserDto.name,
        surname:  createUserDto.surname,
        email:    createUserDto.email,
        password: createUserDto.password,
        nickname: createUserDto.nickname
      }
    })

    return user;
  }

  async findAll() {
    const users: UserDto[] = await this.prismaService.user.findMany()
    
    return users;
  }

  async findOne(nickname: string) {
    const user: UserDto = await this.prismaService.user.findUnique({
      where: {
        nickname
      }
    })
    
    return user;
  }
  
  async findUnique(type: string, userDto: UserDto) {
    if(type === "nickname"){
      const user: UserDto = await this.prismaService.user.findUnique({
        where: {
          nickname: userDto.nickname,
          password: userDto.password
        }
      })
      
      return user

    } else if (type === "email") {
      const user: UserDto = await this.prismaService.user.findUnique({
        where: {
          email: userDto.email,
          password: userDto.password
        }
      })
      
      return user
    } else {
      return {
        message: "error",
        "error": "the type is invalid"
      }
    }
  }

  async update(updateType: string, updateUserDto: UpdateUserDto) {
    if (updateType === "email") {
        const userUpdated: UserDto = await this.prismaService.user.update({
          where: {
            nickname: updateUserDto.nickname,
            password: updateUserDto.password,
            surname:  updateUserDto.surname
          },
          data: {
            email: updateUserDto.email
          }
        })

        return userUpdated;

    } else if (updateType === "password") {
      const userUpdated: UserDto = await this.prismaService.user.update({
        where: {
          nickname: updateUserDto.nickname,
          email:    updateUserDto.email,
          surname:  updateUserDto.surname
        },
        data: {
          password: updateUserDto.password
        }
      })

      return userUpdated;
    } else if (updateType === "nickname") {
      
      const user: UserDto = await this.prismaService.user.findUnique({
        where: {
          email:    updateUserDto.email,
          password: updateUserDto.password
        }
      })

      if(user.nickname !== updateUserDto.nickname) {
        const userUpdated: UserDto = await this.prismaService.user.update({
          where: {
            nickname: user.nickname,
          },
          data: {
            nickname: updateUserDto.nickname,
          }
        });

        return userUpdated;
      }
      
      return {
        message: "this nickname already exists",
        messageContent: user
      };
    } else {
      return {
        message: "error",
        "error": "the type is invalid"
      }
    }
  } 

  async remove(userDto: UserDto) {
    const exUser: UserDto = await this.prismaService.user.delete({
      where: {
        nickname: userDto.nickname,
        email:  userDto.email
      }
    })

    return exUser
  }

  // async getAllRedis() {
  //   const cacheUser = await this.redisService.get("")

  //   await this.redisService.set('user', JSON.stringify(cacheUser))

  //   if(!cacheUser) {
  //     const users: UserDto[] = await this.prismaService.user.findMany() 
      
  //     return users
  //   }

  //   return JSON.parse(cacheUser)
  // }
}
