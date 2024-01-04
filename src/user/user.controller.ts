import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
// import { Role } from '../types/userRole.ts';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('local')
  async getMyInfo(@Req() req) {
    return req.user;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getMe(@Req() req) {
    const user = req.user;
    console.log(user);
    return {
      id: user.id,
      userName: user.name,
    };
  }
}
