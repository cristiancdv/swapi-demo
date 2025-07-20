import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

export class PlanetsEntityDetails {
  constructor(
    private readonly planet: PlanetsData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get count(): number {
    return this.planet.count;
  }

  get id(): string {
    return this.planet.url.split("/")[this.planet.url.split("/").length - 2];
  }

  get name(): string {
    return this.planet.name;
  }

  get description(): string {
    return `
    - Periodo de rotación: ${this.planet.rotation_period} 
    - Diámetro: ${this.planet.diameter} 
    - Clima: ${this.planet.climate} 
    - Terreno: ${this.planet.terrain} 
    `;
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
