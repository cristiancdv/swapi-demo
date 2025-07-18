import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/health (GET)", () => {
    return request(app.getHttpServer()).get("/health").expect(200).expect("OK");
  });

  it("/characters (GET)", () => {
    return request(app.getHttpServer()).get("/characters").expect(200).expect([]);
  });

  it("/characters (POST)", () => {
    return request(app.getHttpServer()).post("/characters").send({ name: "Luke Skywalker" }).expect(201);
  });

  it("/characters/:id (GET)", () => {
    return request(app.getHttpServer()).get("/characters/1").expect(200).expect({ id: 1, name: "Luke Skywalker" });
  });

  it("/characters/:id (PUT)", () => {
    return request(app.getHttpServer()).put("/characters/1").send({ name: "Luke Skywalker" }).expect(200);
  });

  it("/characters/:id (DELETE)", () => {
    return request(app.getHttpServer()).delete("/characters/1").expect(200);
  });

  it("/movies (GET)", () => {
    return request(app.getHttpServer()).get("/movies").expect(200).expect([]);
  });

  it("/movies (POST)", () => {
    return request(app.getHttpServer()).post("/movies").send({ name: "Star Wars: A New Hope" }).expect(201);
  });

  it("/movies/:id (GET)", () => {
    return request(app.getHttpServer()).get("/movies/1").expect(200).expect({ id: 1, name: "Star Wars: A New Hope" });
  });

  it("/movies/:id (PUT)", () => {
    return request(app.getHttpServer()).put("/movies/1").send({ name: "Star Wars: A New Hope" }).expect(200);
  });

  it("/movies/:id (DELETE)", () => {
    return request(app.getHttpServer()).delete("/movies/1").expect(200);
  });

  it("/ships (GET)", () => {
    return request(app.getHttpServer()).get("/ships").expect(200).expect([]);
  });

  it("/ships (POST)", () => {
    return request(app.getHttpServer()).post("/ships").send({ name: "Millennium Falcon" }).expect(201);
  });

  it("/ships/:id (GET)", () => {
    return request(app.getHttpServer()).get("/ships/1").expect(200).expect({ id: 1, name: "Millennium Falcon" });
  });

  it("/ships/:id (PUT)", () => {
    return request(app.getHttpServer()).put("/ships/1").send({ name: "Millennium Falcon" }).expect(200);
  });

  it("/ships/:id (DELETE)", () => {
    return request(app.getHttpServer()).delete("/ships/1").expect(200);
  });

  it("/planets (GET)", () => {
    return request(app.getHttpServer()).get("/planets").expect(200).expect([]);
  });

  it("/planets (POST)", () => {
    return request(app.getHttpServer()).post("/planets").send({ name: "Tatooine" }).expect(201);
  });

  it("/planets/:id (GET)", () => {
    return request(app.getHttpServer()).get("/planets/1").expect(200).expect({ id: 1, name: "Tatooine" });
  });

  it("/planets/:id (PUT)", () => {
    return request(app.getHttpServer()).put("/planets/1").send({ name: "Tatooine" }).expect(200);
  });

  it("/planets/:id (DELETE)", () => {
    return request(app.getHttpServer()).delete("/planets/1").expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
