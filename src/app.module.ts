import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { SETTINGS } from './core/settings/settings';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserEntity } from './features/users/domain/user.entity';
import { UsersModule } from './features/users/users.module';

@Module({
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 10000,
            limit: 5
        }]),
        ConfigModule.forRoot({
            envFilePath: ".development.env",
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: SETTINGS.PATH.HOST,
            port: Number(SETTINGS.PORT_DB) || 5432,
            username: SETTINGS.PATH.USERNAME,
            password: SETTINGS.PATH.PASSWORD,
            database: SETTINGS.PATH.DATABASE,
            entities: [UserEntity],
            ssl: true,
            autoLoadEntities: true,
            synchronize: true,
        }),
      UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
