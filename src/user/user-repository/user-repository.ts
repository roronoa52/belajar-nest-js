import { Inject, Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger : Logger
    ){}

    async save(firstName: string, lastName: string) : Promise<User> {
        this.logger.debug(`Creating user with first name ${firstName} and last name ${lastName}`);
        return this.prismaService.user.create({
            data: {
                firstName: firstName,
                lastName: lastName
            }
        });
    }
}