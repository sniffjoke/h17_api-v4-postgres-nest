import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { CreateUserDto } from './models/input/create-user.dto';
import { BasicAuthGuard } from '../../../core/guards/basic-auth.guard';

@Controller('sa')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  @UseGuards(BasicAuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto, false);
  }

  @Get('users')
  @UseGuards(BasicAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.(+id);
  // }


  @Delete('users/:id')
  @HttpCode(204)
  @UseGuards(BasicAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
