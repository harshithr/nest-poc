import { Body, ClassSerializerInterceptor, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { UserCreateDto, UserDto, UserUpdateDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: UserCreateDto) {
    const response = this.userService.create(body);

    return response;
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get('/')
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: UserUpdateDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param() id: string) {
    return this.userService.remove(parseInt(id));
  }
}
