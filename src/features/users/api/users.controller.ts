import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './models/input/create-user.dto';
import { BasicAuthGuard } from '../../../core/guards/basic-auth.guard';

@Controller('sa')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UseGuards(BasicAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  @UseGuards(BasicAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }


  @Delete('users/:id')
  @UseGuards(BasicAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
