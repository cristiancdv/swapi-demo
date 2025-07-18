import { Injectable } from "@nestjs/common";
import { AxiosService } from "../../infra/axios/axios.service";
import { GetPlanetDto } from "../../app/planets/dto/get-planet.dto";
import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class PlanetRepository {
  constructor(private readonly axiosService: AxiosService) {}

  async getPlanet({ id }: GetPlanetDto): Promise<PlanetsData> {
    if (!id) {
      throw new Error("ID is required");
    }

    return await this.axiosService.get<PlanetsData>("planets", id);
  }

  async getAllPlanets(page: number): Promise<PaginatedResponse<PlanetsData>> {
    return await this.axiosService.getAll<PlanetsData>("planets", page);
  }
}
