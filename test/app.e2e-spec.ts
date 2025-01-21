import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it("should farhan yp", async () =>{
    const result = await request(app.getHttpServer())
    .get("/api/users")
    .query({
      first_name: "farhan",
      last_name: "yp"
    });

    expect(result.status).toBe(200);
    expect(result.text).toBe("Hi farhan yp");

  })
});
