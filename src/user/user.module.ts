import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Connection, MONGODBConnection, MYSQLConnection } from './connection/connection';
import { Mail, mailService } from './mail/mail';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == "mysql" ? MYSQLConnection : MONGODBConnection
    },
    {
      provide: Mail,
      useValue: mailService
    }
  ]
})
export class UserModule {}
