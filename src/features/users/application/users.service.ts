import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../api/models/input/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await  this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
