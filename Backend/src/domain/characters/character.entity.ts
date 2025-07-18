import { FilmsData } from "../../infra/axios/types/films-data/films-data";
import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";
import { ShipData } from "../../infra/axios/types/ship-data/ship-data";

export class CharacterEntityDetails {
  constructor(private readonly character: CharacterData) {}

  get count(): number {
    return this.character.count;
  }

  get id(): string {
    return this.character.url.split("/")[this.character.url.split("/").length - 2];
  }
  get name(): string {
    return this.character.name;
  }
  get description(): string {
    return `
    - Altura: ${this.character.height} 
    - Peso: ${this.character.mass} 
    - Color de pelo: ${this.character.hair_color} 
    - Color de piel: ${this.character.skin_color} 
    - Color de ojos: ${this.character.eye_color} 
    - Año de nacimiento: ${this.character.birth_year} 
    - Género: ${this.character.gender}`;
  }

  get homeworld(): PlanetsData {
    return this.character.homeworld;
  }

  get films(): FilmsData[] {
    return this.character.films;
  }

  get species(): string[] {
    return this.character.species;
  }

  get vehicles(): string[] {
    return this.character.vehicles;
  }

  get starships(): ShipData[] {
    return this.character.starships;
  }

  get created(): string {
    return this.character.created;
  }

  get edited(): string {
    return this.character.edited;
  }

  get url(): string {
    return this.character.url;
  }
}
