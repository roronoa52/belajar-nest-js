import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
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

  it("Should return 'yp'", () => {
    const response = controller.learnDependencyInjection1('yp')
    expect(response).toBe('Hello yp!')
  })
});
