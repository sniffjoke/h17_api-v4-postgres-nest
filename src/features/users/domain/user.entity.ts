import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EmailConfirmationModel } from '../api/models/input/create-user.dto';

class EmailConfirmationDto {
  @Column()
  isConfirmed: boolean;

  @Column({nullable: false})
  confirmationCode: string

  @Column({nullable: false})
  expirationDate: string
}


@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  login: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: string

  @Column({type: 'varchar'})
  emailConfirmation: EmailConfirmationDto

}
