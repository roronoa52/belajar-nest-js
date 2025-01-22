import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, MONGODBConnection, MYSQLConnection } from './connection/connection';
import { Mail, mailService } from './mail/mail';
import { createUserRepository, UserRepository } from './user-repository/user-repository';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    {
      provide: Connection,
      useFactory: createConnection,
      inject: [ConfigService]
    },
    {
      provide: Mail,
      useValue: mailService
    },
    {
      provide: UserRepository,
      useFactory: createUserRepository,
      inject: [Connection]
    }
  ]
})
export class UserModule {}
