import { Controller, Get, Param, ParseIntPipe, Query, DefaultValuePipe } from "@nestjs/common";
import { PlanetsService } from "../../../app/planets/planets.service";
import { PlanetEntityDetails } from "@/domain/planets/planet.entity";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Controller("planets")
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number): Promise<PaginatedResponse<PlanetEntityDetails>> {
    return this.planetsService.findAll(page);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<PlanetEntityDetails> {
    return this.planetsService.findOne({ id });
  }
}
