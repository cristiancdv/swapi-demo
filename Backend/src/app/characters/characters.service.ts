import { Injectable } from "@nestjs/common";
import { CharactersEntityDetails } from "@/domain/characters/characters.entity";
import { CharacterEntityDetails } from "@/domain/characters/character.entity";
import { GetAllCharactersUseCase, GetCharacterUseCase } from "./characters.use-cases";
import { GetCharacterDto } from "./dto/get-character.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class CharactersService {
  constructor(
    private readonly getCharacterUseCase: GetCharacterUseCase,
    private readonly getAllCharactersUseCase: GetAllCharactersUseCase,
  ) {}

  async findAll(page: number): Promise<PaginatedResponse<CharactersEntityDetails>> {
    return await this.getAllCharactersUseCase.execute(page);
  }

  async findOne(id: GetCharacterDto): Promise<CharacterEntityDetails> {
    return await this.getCharacterUseCase.execute(id);
  }
}
