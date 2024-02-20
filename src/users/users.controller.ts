import { Response } from 'express';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  private logger: Logger = new Logger('UsersController');
  constructor(private readonly userService: UserService) { }

  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      // Transforma o objeto plain (JSON) em uma instância da classe DTO
      const userDtoInstance = plainToClass(CreateUserDto, createUserDto);

      // Realiza a validação usando o class-validator
      const errors = await validate(userDtoInstance);

      if (errors.length > 0) {
        // Lida com os erros de validação aqui
        return res.status(400).json({ message: 'Erro de validação', errors });
      }

      // Se não houver erros, continue com a lógica do seu controlador
      const user = await this.userService.create(userDtoInstance);

      return res.status(201).json({
        message: 'Usuário criado',
        returnedData: user,
      });

    } catch (error) {
      this.logger.error("error in user creation operation: " + error)

      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();

      if (users && users.length > 0) {
        return res.status(200).json({
          message: "Retornando dados dos usuários",
          returnedData: users,
        });
      } else {
        return res.status(404).json({
          message: "Nenhum usuário encontrado",
          status: 404,
        });
      }

    } catch (error) {
      this.logger.error("Error in findAll users operation: " + error)

      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      // Transforma o objeto plain (JSON) em uma instância da classe DTO
      const userDtoInstance = plainToClass(LoginUserDto, loginUserDto);

      // Realiza a validação usando o class-validator
      const errors = await validate(userDtoInstance);

      if (errors.length > 0) {
        // Lida com os erros de validação aqui
        return res.status(400).json({ message: 'Erro de validação', errors });
      }

      // Se não houver erros, continue com a lógica do seu controlador
      const user = await this.userService.findOne(userDtoInstance);

      return res.status(200).json({
        message: 'retornando dados do usuario achado',
        status: 200,
        returnedData: user,
      });

    } catch (error) {
      this.logger.error("Error in login user operation: " + error)

      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Get(':nickname')
  async findOne(@Param('nickname') nickname: string, @Res() res: Response) {
    try {
      const user = await this.userService.findByNickname(nickname);

      if(user) {
        return res.status(200).json({
          message: "retornando dados do usuario encontrado",
          returnedData: user,
        });
      } else {
        return res.status(404).json({
          message: "usuario não encontrado",
          status: 404,
        });
      }
    } catch (error) {

      this.logger.error("Error in get by nickname operation: " + error)

      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Patch('update')
  async update(@Query('type') type: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    try {
      if (['email', 'password', 'nickname'].includes(type)) {
        
        const userDtoInstance = plainToClass(UpdateUserDto, updateUserDto);

        
        const errors = await validate(userDtoInstance);

        if (errors.length > 0) {
          return res.status(400).json({ message: 'Erro de validação', errors });
        }

        const user: UserDto | {} = await this.userService.update(type, userDtoInstance)

        return res.status(200).json({
          message: "dados do usuario atualizados",
          returnedData: user,
        });
      }


    } catch (error) {
      this.logger.error("Error in user update operation: " + error)
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Delete('delete')
  async remove(@Body() userDto: UserDto, @Res() res: Response) {
    try {

      const userDtoInstace = plainToClass(UserDto, userDto)

      const errors = await validate(userDtoInstace)

      if (errors.length > 0) {
        return res.status(400).json({ message: 'Erro de validação', errors });
      }

      const exUser: UserDto = await this.userService.remove(userDtoInstace)

      return res.status(200).json({
        message: "usuario deletado",
        returnedData: exUser,
      });
    } catch (error) {
      this.logger.error("Error in delete user operation: " + error)
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }

  @Get('test')
  async redisTest(@Res() res: Response) {
    try {
      const cacheUser = await this.userService.FindMany()

      return res.status(200).json({
        message: "retornando dados do usuario encontrado",
        returnedData: cacheUser,
      });
    } catch (error) {
      this.logger.error("Error in redis test operation: " + error)
      return res.status(500).json({
        message: 'Internal Server Error',
        status: 500,
      });
    }
  }
}
