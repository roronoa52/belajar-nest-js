import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "hello world"',() =>{
    expect(controller.get()).toBe("ini helloworld")
  })

  it('should return cookie value ',() =>{
    
    const mockRequest = httpMocks.createRequest({
      cookies: {
        name: "farhan yudha pratama"
      }
    })

    const result = controller.GetCookie(mockRequest)

    expect(result).toBe("Cookie value is farhan yudha pratama")
  })
});
