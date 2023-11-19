import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto, UserLoginDto } from './dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(body: UserCreateDto) {
    const ifUserExist = await this.usersService.find(body.email);

    if (ifUserExist.length)
      throw new BadRequestException('User already exists');

    const encryptedPassword = await bcrypt.hash(body.password, 10);
    
    const token = await this.jwtService.signAsync({
      email: body.email,
    })
    

    const userCreate = await this.usersService.create({ ...body, password: encryptedPassword, token });
    
    if (!userCreate) return userCreate;

    return token;
  }

  async login(body: UserLoginDto) {
    const [user] = await this.usersService.find(body.email);

    if (!user) throw new NotFoundException('User not found')

    const comparePass = await bcrypt.compare(body.password, user.password);

    if (!comparePass) throw new BadRequestException('Email or password is incorrect')

    return user.token;
  }
}
