import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;
}

export class UserUpdateDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  name: string;
}

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name: string;
}
