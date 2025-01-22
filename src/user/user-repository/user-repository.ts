import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private prismaService: PrismaService){}

    async save(firstName: string, lastName: string) {
        return this.prismaService.user.create({
            data: {
                firstName: firstName,
                lastName: lastName
            }
        });
    }
}