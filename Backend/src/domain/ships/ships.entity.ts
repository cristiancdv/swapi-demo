import { ShipData } from "../../infra/axios/types/ship-data/ship-data";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

export class ShipsEntityDetails {
  constructor(
    private readonly ship: ShipData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

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

  get pilots(): string[] {
    return this.ship.pilots.map(pilot => this.replaceEndpointsService.replaceEndpoints(pilot));
  }

  get films(): string[] {
    return this.ship.films.map(film => this.replaceEndpointsService.replaceEndpoints(film));
  }

  get created(): string {
    return this.ship.created;
  }

  get edited(): string {
    return this.ship.edited;
  }

  get url(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.ship.url);
  }
}
