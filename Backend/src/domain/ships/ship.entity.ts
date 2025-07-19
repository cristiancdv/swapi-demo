import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";
import { ShipData } from "../../infra/axios/types/ship-data/ship-data";

export class ShipEntityDetails {
  constructor(
    private readonly ship: ShipData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get id(): string {
    return this.ship.url.split("/")[this.ship.url.split("/").length - 2];
  }
  get name(): string {
    return this.ship.name;
  }
  get model(): string {
    return this.ship.model;
  }
  get manufacturer(): string {
    return this.ship.manufacturer;
  }
  get cost_in_credits(): string {
    return this.ship.cost_in_credits;
  }
  get length(): string {
    return this.ship.length;
  }
  get max_atmosphering_speed(): string {
    return this.ship.max_atmosphering_speed;
  }
  get crew(): string {
    return this.ship.crew;
  }
  get passengers(): string {
    return this.ship.passengers;
  }
  get cargo_capacity(): string {
    return this.ship.cargo_capacity;
  }
  get consumables(): string {
    return this.ship.consumables;
  }
  get hyperdrive_rating(): string {
    return this.ship.hyperdrive_rating;
  }
  get MGLT(): string {
    return this.ship.MGLT;
  }
  get starship_class(): string {
    return this.ship.starship_class;
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
