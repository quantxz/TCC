import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    
    return res.status(200).json({
      message: "user created",
      returnedData: user,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const user = await this.userService.findAll();

    return res.status(200).json({
      message: "returning all users",
      returnedData: user,
    }); 
  }

  @Get('login')
  async findUnique(@Body() userDto: UserDto, @Res() res: Response, @Query('type') type: string) {
    const user: UserDto | {} = await this.userService.findUnique(type, userDto);

    return res.status(200).json({
      message: "returning all users",
      status: 200,
      returnedData: user,
    }); 
  }

  @Get(':nickname')
  async findOne(@Param('nickname') nickname: string, @Res() res: Response) {
    const user = await this.userService.findOne(nickname); 
    
    return res.status(200).json({
      message: "returning the found user",
      returnedData: user,
    });
  }

  @Patch('update')
  async update(@Query('type') type: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const user: UserDto | {} = await this.userService.update(type, updateUserDto)
    
    return res.status(200).json({
      message: "user updated",
      returnedData: user,
    });
  }

  @Delete('delete')
  async remove(@Body() userDto: UserDto, @Res() res: Response) {
    const exUser: UserDto = await this.userService.remove(userDto)

    return res.status(200).json({
      message: "user deleted",
      returnedData: exUser,
    });
  }

  // @Get('test')
  // async redisTest(@Res() res: Response) {
  //   const cacheUser = await this.userService.getAllRedis()

  //   return res.status(200).json({
  //     message: "user deleted",
  //     returnedData: cacheUser,
  //   });
  // }
}
