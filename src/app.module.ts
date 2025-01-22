import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true
  }),
  UserModule,
  PrismaModule,
  ValidationModule.forRoot(true)
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
