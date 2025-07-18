import { Injectable } from "@nestjs/common";
import { AxiosService } from "../../infra/axios/axios.service";
import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { GetCharacterDto } from "../../app/characters/dto/get-character.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class CharacterRepository {
  constructor(private readonly swapiService: AxiosService) {}

  async getCharacter({ id }: GetCharacterDto): Promise<CharacterData> {
    if (!id) {
      throw new Error("ID is required");
    }
    return await this.swapiService.get<CharacterData>("people", String(id));
  }

  async getAllCharacters(page: number): Promise<PaginatedResponse<CharacterData>> {
    return await this.swapiService.getAll<CharacterData>("people", page);
  }
}
