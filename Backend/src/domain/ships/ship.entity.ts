import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { FilmsData } from "../../infra/axios/types/films-data/films-data";
import { ShipData } from "../../infra/axios/types/ship-data/ship-data";

export class ShipEntityDetails {
  constructor(private readonly ship: ShipData) {}

  get count(): number {
    return this.ship.count;
  }

  get id(): string {
    return this.ship.url.split("/")[this.ship.url.split("/").length - 2];
  }

  get name(): string {
    return this.ship.name;
  }

  get description(): string {
    return `
    - Modelo: ${this.ship.model} 
    - Fabricante: ${this.ship.manufacturer} 
    - Tripulación: ${this.ship.crew} 
    - Pasajeros: ${this.ship.passengers} 
    - Clase de nave: ${this.ship.starship_class}`;
  }

  get pilots(): CharacterData[] {
    return this.ship.pilots;
  }

  get films(): FilmsData[] {
    return this.ship.films;
  }

  get created(): string {
    return this.ship.created;
  }

  get edited(): string {
    return this.ship.edited;
  }

  get url(): string {
    return this.ship.url;
  }
}
