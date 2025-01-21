import { Controller, Get, Post } from '@nestjs/common';

@Controller('/api/users')
export class UserController {

    @Post()
    post(): string{

        return "ini post";
    }

    @Get("/helloworld")
    get(): string{

        return "ini helloworld";
    }

}
