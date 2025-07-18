import { Injectable } from "@nestjs/common";
import { PlanetRepository } from "../../domain/planets/planet.repository";
import { PlanetEntityDetails } from "../../domain/planets/planet.entity";
import { GetPlanetDto } from "./dto/get-planet.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class GetPlanetUseCase {
  constructor(private readonly planetRepository: PlanetRepository) {}

  async execute(id: GetPlanetDto): Promise<PlanetEntityDetails> {
    const response = await this.planetRepository.getPlanet(id);
    const planet = new PlanetEntityDetails(response);
    return {
      id: planet.id,
      name: planet.name,
      description: planet.description,
      residents: planet.residents,
      films: planet.films,
      created: planet.created,
      edited: planet.edited,
      url: planet.url,
    } as PlanetEntityDetails;
  }
}

@Injectable()
export class GetAllPlanetsUseCase {
  constructor(private readonly planetRepository: PlanetRepository) {}

  async execute(page: number): Promise<PaginatedResponse<PlanetEntityDetails>> {
    const response = await this.planetRepository.getAllPlanets(page);
    const count = response.count;
    return {
      count,
      results: response.results.map(planet => {
        const planetEntity = new PlanetEntityDetails(planet);
        return {
          id: planetEntity.id,
          name: planetEntity.name,
          description: planetEntity.description,
          residents: planetEntity.residents,
          films: planetEntity.films,
          created: planetEntity.created,
          edited: planetEntity.edited,
          url: planetEntity.url,
        } as PlanetEntityDetails;
      }),
    };
  }
}
