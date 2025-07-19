import { Injectable } from "@nestjs/common";
import { CharactersEntityDetails } from "../../domain/characters/characters.entity";
import { CharacterEntityDetails } from "../../domain/characters/character.entity";
import { CharacterRepository } from "../../domain/characters/character.repository";
import { GetCharacterDto } from "./dto/get-character.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Injectable()
export class GetCharacterUseCase {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(id: GetCharacterDto): Promise<CharacterEntityDetails> {
    const response = await this.characterRepository.getCharacter(id);
    const character = new CharacterEntityDetails(response, this.replaceEndpointsService);
    return {
      id: character.id,
      name: character.name,
      height: character.height,
      mass: character.mass,
      hair_color: character.hair_color,
      skin_color: character.skin_color,
      eye_color: character.eye_color,
      birth_year: character.birth_year,
      gender: character.gender,
      homeworld: character.homeworld,
      films: character.films,
      species: character.species,
      starships: character.starships,
      created: character.created,
      edited: character.edited,
      url: character.url,
    } as CharacterEntityDetails;
  }
}

@Injectable()
export class GetAllCharactersUseCase {
  constructor(
    private readonly characterRepository: CharacterRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}
  async execute(page: number): Promise<PaginatedResponse<CharactersEntityDetails>> {
    const { count, results } = await this.characterRepository.getAllCharacters(page);
    return {
      count,
      results: results.map(character => {
        const characterEntity = new CharactersEntityDetails(character, this.replaceEndpointsService);
        return {
          id: characterEntity.id,
          name: characterEntity.name,
          description: characterEntity.description,
          homeworld: characterEntity.homeworld,
          films: characterEntity.films,
          species: characterEntity.species,
          starships: characterEntity.starships,
          created: characterEntity.created,
          edited: characterEntity.edited,
          url: characterEntity.url,
        } as CharactersEntityDetails;
      }),
    };
  }
}
