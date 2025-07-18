import { Injectable } from "@nestjs/common";
import { GetPlanetDto } from "./dto/get-planet.dto";
import { PlanetEntityDetails } from "@/domain/planets/planet.entity";
import { GetAllPlanetsUseCase, GetPlanetUseCase } from "./planets.use-cases";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class PlanetsService {
  constructor(
    private readonly getPlanetUseCase: GetPlanetUseCase,
    private readonly getAllPlanetsUseCase: GetAllPlanetsUseCase,
  ) {}

  async findAll(page: number): Promise<PaginatedResponse<PlanetEntityDetails>> {
    return await this.getAllPlanetsUseCase.execute(page);
  }

  async findOne(id: GetPlanetDto): Promise<PlanetEntityDetails> {
    return await this.getPlanetUseCase.execute(id);
  }
}
