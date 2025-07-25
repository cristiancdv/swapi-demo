import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";
import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";

export class PlanetEntityDetails {
  constructor(
    private readonly planet: PlanetsData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get id(): string {
    return this.planet.url.split("/")[this.planet.url.split("/").length - 2];
  }
  get name(): string {
    return this.planet.name;
  }

  get diameter(): string {
    return this.planet.diameter;
  }
  get rotation_period(): string {
    return this.planet.rotation_period;
  }
  get orbital_period(): string {
    return this.planet.orbital_period;
  }
  get gravity(): string {
    return this.planet.gravity;
  }
  get terrain(): string {
    return this.planet.terrain;
  }
  get surface_water(): string {
    return this.planet.surface_water;
  }
  get population(): string {
    return this.planet.population;
  }
  get climate(): string {
    return this.planet.climate;
  }
  get residents(): string[] {
    return this.planet.residents.map(resident => this.replaceEndpointsService.replaceEndpoints(resident));
  }
  get films(): string[] {
    return this.planet.films.map(film => this.replaceEndpointsService.replaceEndpoints(film));
  }
  get created(): string {
    return this.planet.created;
  }
  get edited(): string {
    return this.planet.edited;
  }
  get url(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.planet.url);
  }
}
