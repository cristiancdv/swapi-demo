import { Test, TestingModule } from "@nestjs/testing";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "../../../app/movies/movies.service";

describe("MoviesController", () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
