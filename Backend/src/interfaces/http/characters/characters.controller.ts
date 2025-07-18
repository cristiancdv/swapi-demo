import { Controller, Get, Param, ParseIntPipe, Query, DefaultValuePipe } from "@nestjs/common";
import { CharactersService } from "../../../app/characters/characters.service";
import { CharacterEntityDetails } from "@/domain/characters/character.entity";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Controller("characters")
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number): Promise<PaginatedResponse<CharacterEntityDetails>> {
    return this.charactersService.findAll(page);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<CharacterEntityDetails> {
    return this.charactersService.findOne({ id });
  }
}
