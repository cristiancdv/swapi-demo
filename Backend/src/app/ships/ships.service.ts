import { Injectable } from "@nestjs/common";
import { GetShipDto } from "./dto/get-ship.dto";
import { ShipsEntityDetails } from "@/domain/ships/ships.entity";
import { ShipEntityDetails } from "@/domain/ships/ship.entity";
import { GetAllShipsUseCase, GetShipUseCase } from "./ships.use-cases";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class ShipsService {
  constructor(
    private readonly getShipUseCase: GetShipUseCase,
    private readonly getAllShipsUseCase: GetAllShipsUseCase,
  ) {}

  findAll(page: number): Promise<PaginatedResponse<ShipsEntityDetails>> {
    return this.getAllShipsUseCase.execute(page);
  }

  findOne(id: GetShipDto): Promise<ShipEntityDetails> {
    return this.getShipUseCase.execute(id);
  }
}
