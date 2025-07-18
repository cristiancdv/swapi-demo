import { Injectable } from "@nestjs/common";
import { AxiosService } from "../../infra/axios/axios.service";
import { ShipData } from "../../infra/axios/types/ship-data/ship-data";
import { GetShipDto } from "../../app/ships/dto/get-ship.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class ShipRepository {
  constructor(private readonly axiosService: AxiosService) {}

  async getShip({ id }: GetShipDto): Promise<ShipData> {
    if (!id) {
      throw new Error("ID is required");
    }

    return await this.axiosService.get<ShipData>("starships", id);
  }

  async getAllShips(page: number): Promise<PaginatedResponse<ShipData>> {
    return await this.axiosService.getAll<ShipData>("starships", page);
  }
}
