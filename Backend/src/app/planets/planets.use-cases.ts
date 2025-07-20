import { Injectable } from "@nestjs/common";
import { PlanetRepository } from "../../domain/planets/planet.repository";
import { PlanetsEntityDetails } from "../../domain/planets/planets.entity";
import { PlanetEntityDetails } from "../../domain/planets/planet.entity";
import { GetPlanetDto } from "./dto/get-planet.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Injectable()
export class GetPlanetUseCase {
  constructor(
    private readonly planetRepository: PlanetRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(id: GetPlanetDto): Promise<PlanetEntityDetails> {
    const response = await this.planetRepository.getPlanet(id);
    const planet = new PlanetEntityDetails(response, this.replaceEndpointsService);
    return {
      id: planet.id,
      name: planet.name,
      diameter: planet.diameter,
      rotation_period: planet.rotation_period,
      orbital_period: planet.orbital_period,
      gravity: planet.gravity,
      terrain: planet.terrain,
      surface_water: planet.surface_water,
      population: planet.population,
      climate: planet.climate,
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
  constructor(
    private readonly planetRepository: PlanetRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(page: number): Promise<PaginatedResponse<PlanetsEntityDetails>> {
    const { count, results } = await this.planetRepository.getAllPlanets(page);
    return {
      count,
      results: results.map(planet => {
        const planetEntity = new PlanetsEntityDetails(planet, this.replaceEndpointsService);
        return {
          id: planetEntity.id,
          name: planetEntity.name,
          description: planetEntity.description,
          residents: planetEntity.residents,
          films: planetEntity.films,
          created: planetEntity.created,
          edited: planetEntity.edited,
          url: planetEntity.url,
        } as PlanetsEntityDetails;
      }),
    };
  }
}
