import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(body: UserCreateDto) {
    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const response = await this.repo.findOne({ where: { id } });

    if (!response) throw new NotFoundException('user not found');

    return response;
  }

  async find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attr: Partial<User>) {
    const foundUser = await this.findOne(id);

    if (!foundUser) throw new NotFoundException('user not found');

    const updatedUser = Object.assign(foundUser, attr);
    return this.repo.save(updatedUser);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async findOneAny(whereObj: Partial<UserCreateDto>) {
    return this.repo.findOne({ where: whereObj })
  }
}
