import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";
import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { FilmsData } from "../../infra/axios/types/films-data/films-data";

export class PlanetEntityDetails {
  constructor(private readonly planet: PlanetsData) {}

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
    - Nombre: ${this.planet.name} 
    - Periodo de rotación: ${this.planet.rotation_period} 
    - Periodo orbital: ${this.planet.orbital_period} 
    - Diámetro: ${this.planet.diameter} 
    - Clima: ${this.planet.climate} 
    - Gravedad: ${this.planet.gravity} 
    - Terreno: ${this.planet.terrain} 
    - Agua superficial: ${this.planet.surface_water} 
    - Población: ${this.planet.population}`;
  }

  get residents(): CharacterData[] {
    return this.planet.residents;
  }

  get films(): FilmsData[] {
    return this.planet.films;
  }

  get created(): string {
    return this.planet.created;
  }

  get edited(): string {
    return this.planet.edited;
  }

  get url(): string {
    return this.planet.url;
  }
}
