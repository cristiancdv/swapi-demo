import { Injectable } from "@nestjs/common";
import { CharacterEntityDetails } from "../../domain/characters/character.entity";
import { CharacterRepository } from "../../domain/characters/character.repository";
import { GetCharacterDto } from "./dto/get-character.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class GetCharacterUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(id: GetCharacterDto): Promise<CharacterEntityDetails> {
    const response = await this.characterRepository.getCharacter(id);
    const character = new CharacterEntityDetails(response);
    return {
      id: character.id,
      name: character.name,
      description: character.description,
      homeworld: character.homeworld,
      films: character.films,
      species: character.species,
      vehicles: character.vehicles,
      starships: character.starships,
      created: character.created,
      edited: character.edited,
      url: character.url,
    } as CharacterEntityDetails;
  }
}

@Injectable()
export class GetAllCharactersUseCase {
  constructor(private readonly characterRepository: CharacterRepository) {}

  async execute(page: number): Promise<PaginatedResponse<CharacterEntityDetails>> {
    const response = await this.characterRepository.getAllCharacters(page);
    const count = response.count;
    return {
      count,
      results: response.results.map(character => {
        const characterEntity = new CharacterEntityDetails(character);
        return {
          id: characterEntity.id,
          name: characterEntity.name,
          description: characterEntity.description,
          homeworld: characterEntity.homeworld,
          films: characterEntity.films,
          species: characterEntity.species,
          vehicles: characterEntity.vehicles,
          starships: characterEntity.starships,
          created: characterEntity.created,
          edited: characterEntity.edited,
          url: characterEntity.url,
        } as CharacterEntityDetails;
      }),
    };
  }
}
