import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Post, Query, Redirect, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('/api/users')
export class UserController {

    @Get("/sample-response")
    @Header("Content-Type", "application/json")
    @HttpCode(200)
    sampleResponse(): Record<string, string>{
        return{
            "data": "Hello World"
        }
    }

    @Get("/redirect")
    @Redirect("/sample-response")
    sampleRedirect(): HttpRedirectResponse{
        return{
            url:"sample-response",
            statusCode: 301
        }
    }

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
