import { Controller, Get, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {

    @Get()
    getByQuery(
        @Query("first_name") firstName:string,
        @Query("last_name") lastName:string,
    ): string{

        return `Hi ${firstName} ${lastName}`;
    }

    @Get("/:id")
    getById(@Req() request:Request): string{

        return `Get user with id ${request.params.id}`;
    }

    @Post()
    post(): string{

        return "ini post";
    }

    @Get("/helloworld")
    get(): string{

        return "ini helloworld";
    }

}
