import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../domain/user.entity';
import { CreateUserDto } from '../api/models/input/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly uRepository: Repository<UserEntity>
  ) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.uRepository.save(createUserDto);
  }

  async getAllUsers() {
    return await  this.uRepository.find();
  }

  async findUserById(id: string) {
    const findedUser = await this.uRepository.findOneBy({id});
    if (!findedUser) {
      throw new NotFoundException('User not found');
    }
    return findedUser
  }

  async findUserByLogin(login: string) {
    const findedUser = await this.uRepository.findOneBy({login});
    if (!findedUser) {
      throw new NotFoundException('User not found');
    }
    return findedUser
  }

  async deleteUserById(id: string) {
    const findedUser = await this.findUserById(id)
    return await this.uRepository.delete(id);
  }

}
