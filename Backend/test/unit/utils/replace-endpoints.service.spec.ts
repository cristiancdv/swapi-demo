import { Test, TestingModule } from "@nestjs/testing";
import { ReplaceEndpointsService } from "./replace-endpoints.service";

describe("ReplaceEndpointsService", () => {
  let service: ReplaceEndpointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReplaceEndpointsService],
    }).compile();

    service = module.get<ReplaceEndpointsService>(ReplaceEndpointsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
