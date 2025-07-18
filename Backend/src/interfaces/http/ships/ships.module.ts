import { Module } from "@nestjs/common";
import { ShipsService } from "../../../app/ships/ships.service";
import { ShipsController } from "./ships.controller";
import { GetAllShipsUseCase, GetShipUseCase } from "@/app/ships/ships.use-cases";
import { ShipRepository } from "@/domain/ships/ship.repository";
import { AxiosModule } from "@/infra/axios/axios.module";

@Module({
  imports: [AxiosModule],
  controllers: [ShipsController],
  providers: [ShipsService, GetShipUseCase, GetAllShipsUseCase, ShipRepository],
})
export class ShipsModule {}
