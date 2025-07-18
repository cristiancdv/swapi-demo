import { Controller, Get, Param, ParseIntPipe, Query, DefaultValuePipe } from "@nestjs/common";
import { ShipsService } from "../../../app/ships/ships.service";
import { ShipEntityDetails } from "@/domain/ships/ship.entity";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Controller("ships")
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number): Promise<PaginatedResponse<ShipEntityDetails>> {
    return this.shipsService.findAll(page);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<ShipEntityDetails> {
    return this.shipsService.findOne({ id });
  }
}
