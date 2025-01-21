import { Controller, Get, Header, HttpCode, HttpRedirectResponse, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
    ){}

    @Get("learn-dependency-injection1")
    learnDependencyInjection1(name:string): string{
        return this.service.sayHello(name);
    }

    @Get("/set-cookie")
    SetCookie(@Query("name") name:string, @Res() response:Response){
        response.cookie("name", name);
        response.status(200).send("cookie is set: " + name);
    }

    @Get("/get-cookie")
    GetCookie(@Req() request:Request){
        const name = request.cookies.name;
        return `Cookie value is ${name}`;
    }

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
    async getByQuery(
        @Query("first_name") firstName:string,
        @Query("last_name") lastName:string,
    ): Promise<string>{

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
