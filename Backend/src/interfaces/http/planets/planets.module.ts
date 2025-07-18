import { Module } from "@nestjs/common";
import { PlanetsService } from "../../../app/planets/planets.service";
import { PlanetsController } from "./planets.controller";
import { GetAllPlanetsUseCase, GetPlanetUseCase } from "@/app/planets/planets.use-cases";
import { PlanetRepository } from "@/domain/planets/planet.repository";
import { AxiosModule } from "@/infra/axios/axios.module";

@Module({
  imports: [AxiosModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, GetPlanetUseCase, GetAllPlanetsUseCase, PlanetRepository],
})
export class PlanetsModule {}
