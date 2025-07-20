import { Injectable } from "@nestjs/common";
import { ShipRepository } from "../../domain/ships/ship.repository";
import { ShipsEntityDetails } from "../../domain/ships/ships.entity";
import { ShipEntityDetails } from "../../domain/ships/ship.entity";
import { GetShipDto } from "./dto/get-ship.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Injectable()
export class GetShipUseCase {
  constructor(
    private readonly shipRepository: ShipRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(id: GetShipDto): Promise<ShipEntityDetails> {
    const response = await this.shipRepository.getShip(id);
    const ship = new ShipEntityDetails(response, this.replaceEndpointsService);
    return {
      id: ship.id,
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      cost_in_credits: ship.cost_in_credits,
      length: ship.length,
      max_atmosphering_speed: ship.max_atmosphering_speed,
      passengers: ship.passengers,
      cargo_capacity: ship.cargo_capacity,
      consumables: ship.consumables,
      hyperdrive_rating: ship.hyperdrive_rating,
      MGLT: ship.MGLT,
      starship_class: ship.starship_class,
      crew: ship.crew,
      pilots: ship.pilots,
      films: ship.films,
      created: ship.created,
      edited: ship.edited,
      url: ship.url,
    } as ShipEntityDetails;
  }
}

@Injectable()
export class GetAllShipsUseCase {
  constructor(
    private readonly shipRepository: ShipRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(page: number): Promise<PaginatedResponse<ShipsEntityDetails>> {
    const { count, results } = await this.shipRepository.getAllShips(page);
    return {
      count,
      results: results.map(ship => {
        const shipEntity = new ShipsEntityDetails(ship, this.replaceEndpointsService);
        return {
          count,
          id: shipEntity.id,
          name: shipEntity.name,
          description: shipEntity.description,
          pilots: shipEntity.pilots,
          films: shipEntity.films,
          created: shipEntity.created,
          edited: shipEntity.edited,
          url: shipEntity.url,
        } as ShipsEntityDetails;
      }),
    };
  }
}
