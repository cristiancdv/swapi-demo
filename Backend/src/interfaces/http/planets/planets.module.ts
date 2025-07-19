import { Module } from "@nestjs/common";
import { PlanetsService } from "../../../app/planets/planets.service";
import { PlanetsController } from "./planets.controller";
import { GetAllPlanetsUseCase, GetPlanetUseCase } from "@/app/planets/planets.use-cases";
import { PlanetRepository } from "@/domain/planets/planet.repository";
import { AxiosModule } from "@/infra/axios/axios.module";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Module({
  imports: [AxiosModule],
  controllers: [PlanetsController],
  providers: [PlanetsService, GetPlanetUseCase, GetAllPlanetsUseCase, PlanetRepository, ReplaceEndpointsService],
})
export class PlanetsModule {}
