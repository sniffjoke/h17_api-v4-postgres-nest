import { Injectable } from '@nestjs/common';
import { CreateUserDto, EmailConfirmationModel } from '../api/models/input/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user.entity';
import { Repository } from 'typeorm';
import { SETTINGS } from '../../../core/settings/settings';
import { UsersRepository } from '../infrastructure/users.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { UuidService } from "nestjs-uuid";
import { add } from "date-fns";
import { CryptoService } from '../../../core/modules/crypto/application/crypto.service';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity) private readonly uRepository: Repository<UserEntity>,
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailerService,
    private readonly uuidService: UuidService,
    private readonly cryptoService: CryptoService,
  ) {
  }

  async createUser(createUserDto: CreateUserDto, isConfirm: boolean): Promise<string> {
    const emailConfirmation: EmailConfirmationModel = this.createEmailConfirmation(isConfirm);
    if (!isConfirm) {
      await this.sendActivationEmail(createUserDto.email, `${SETTINGS.PATH.API_URL}/?code=${emailConfirmation.confirmationCode as string}`);
    }
    const hashPassword = await this.cryptoService.hashPassword(createUserDto.password);
    const newUserDto = { ...createUserDto, password: hashPassword, emailConfirmation };
    const saveData = await this.usersRepository.createUser(newUserDto);
    return saveData.id
  }

  private createEmailConfirmation(isConfirm: boolean) {
    const emailConfirmationNotConfirm: EmailConfirmationModel = {
      isConfirmed: false,
      confirmationCode: this.uuidService.generate(),
      expirationDate: add(new Date(), {
          hours: 1,
          minutes: 30
        }
      ).toString()
    };
    const emailConfirmationIsConfirm: EmailConfirmationModel = {
      isConfirmed: true
    };
    return isConfirm ? emailConfirmationIsConfirm : emailConfirmationNotConfirm;
  }

  private async sendActivationEmail(to: string, link: string) {
    await this.mailService.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта на " + SETTINGS.PATH.API_URL,
      text: "",
      html:
        `
                <h1>Thank for your registration</h1>
                <p>To finish registration please follow the link below:
                    <a href='${link}'>Завершить регистрацию</a>
                </p>

            `
    });
  }

  async deleteUser(id: string) {
    const findedUser = await this.usersRepository.findUserById(id);
    const deleteUser = await this.usersRepository.deleteUserById(id);
    return deleteUser;
  }

  async findAll() {
    return await  this.usersRepository.getAllUsers();
  }

  // async findOne(id: string) {
  //   return await this.userRepository.findOneBy({ id });
  // }

}
