import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './models/input/create-user.dto';

@Controller('sa')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
