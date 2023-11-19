import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserCreateDto, UserDto, UserLoginDto, UserUpdateDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() body: UserCreateDto) {
    const response = this.authService.signup(body);

    return response;
  }

  @UseGuards(AuthGuard)
  @Post('/signin')
  loginUser(@Body() body: UserLoginDto) {
    const response = this.authService.login(body);

    return response;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @UseGuards(AuthGuard)
  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.userService.update(parseInt(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  removeUser(@Param() id: string) {
    return this.userService.remove(parseInt(id));
  }
}
