import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prismaClient: PrismaClient){}

    async save(firstName: string, lastName: string) {
        return this.prismaClient.user.create({
            data: {
                firstName: firstName,
                lastName: lastName
            }
        });
    }
}