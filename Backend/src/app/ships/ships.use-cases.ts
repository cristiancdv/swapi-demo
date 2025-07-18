import { Injectable } from "@nestjs/common";
import { ShipRepository } from "../../domain/ships/ship.repository";
import { ShipEntityDetails } from "../../domain/ships/ship.entity";
import { GetShipDto } from "./dto/get-ship.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class GetShipUseCase {
  constructor(private readonly shipRepository: ShipRepository) {}

  async execute(id: GetShipDto): Promise<ShipEntityDetails> {
    const response = await this.shipRepository.getShip(id);
    const ship = new ShipEntityDetails(response);
    return {
      id: ship.id,
      name: ship.name,
      description: ship.description,
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
  constructor(private readonly shipRepository: ShipRepository) {}

  async execute(page: number): Promise<PaginatedResponse<ShipEntityDetails>> {
    const response = await this.shipRepository.getAllShips(page);
    const count = response.count;
    return {
      count,
      results: response.results.map(ship => {
        const shipEntity = new ShipEntityDetails(ship);
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
        } as ShipEntityDetails;
      }),
    };
  }
}
