import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectRepository(UserEntity) private readonly uRepository: Repository<UserEntity>,
  ) {
  }

  async userOutput(id: string) {
    const findedUser = await this.uRepository.findOne({ where: { id } });
    if (!findedUser) {
      throw new NotFoundException('User not found');
    }
    return this.userMap(findedUser as unknown as UserEntity);
  }

  userMap(user: UserEntity) {
    const {email, login, createdAt, id} = user
    return {
      id: String(id),
      login,
      email,
      createdAt
    }
  }

}
