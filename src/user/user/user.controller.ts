import { Body, Controller, Get, Header, HttpCode, HttpRedirectResponse, ParseIntPipe, Post, Query, Redirect, Req, Res, UseFilters } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from '../connection/connection';
import { Mail } from '../mail/mail';
import { UserRepository } from '../user-repository/user-repository';
import { User } from '@prisma/client';
import { filter } from 'rxjs';
import { ValidationFilter } from 'src/validation/validation.filter';
import { LoginUserRequest, LoginUserRequestValidation } from 'src/model/login.model';
import { ValidationPipe } from 'src/validation/validation.pipe';
import { Auth } from 'src/auth/auth.decorator';

@Controller('/api/users')
export class UserController {
    constructor(
        private service: UserService,
        private connection: Connection,
        private mailService: Mail,
        private UserRepository: UserRepository
    ){}

    @Get("/current")
    current(@Auth() user: User): Record<string, any>{
        return{
            "data": `Hello ${user.firstName} ${user.lastName}`
        }
    }

    @Post("/login")
    @UseFilters(ValidationFilter)
    login(@Body(new ValidationPipe(LoginUserRequestValidation)) request:LoginUserRequest){
        return `Hi ${request.username}`
    }

    @Get("/validation-sayhello")
    @UseFilters(ValidationFilter)
    sayHello(@Query("name") name:string): string{
        return this.service.sayHello(name);
    }

    @Get("/create")
    async createUser(@Query("first_name") firstName:string, @Query("last_name") lastName:string){
        return await this.UserRepository.save(firstName, lastName);
    }

    @Get("learn-dependency-injection4")
    learnDependencyInjection4(){
        return this.connection.getName();
    }

    @Get("learn-dependency-injection3")
    learnDependencyInjection3(){
        this.mailService.send();
    }

    @Get("learn-dependency-injection2")
    learnDependencyInjection2(){
        return this.connection.getName();
    }

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

    @Get("/id")
    getById(@Query('id', ParseIntPipe) id:Request): string{

        return `Get user with id ${id}`;
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
