import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, createConnection, MONGODBConnection, MYSQLConnection } from './connection/connection';
import { Mail, mailService } from './mail/mail';
import { UserRepository } from './user-repository/user-repository';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Module({
  imports: [],
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
    UserRepository,
    PrismaService
  ]
})
export class UserModule {}
