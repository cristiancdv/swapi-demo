import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { ReplaceEndpointsService } from "../../utils/replace-endpoints/replace-endpoints.service";

export class CharactersEntityDetails {
  constructor(
    private readonly character: CharacterData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get count(): number {
    return this.character.count;
  }

  get id(): string {
    return this.character.url.split("/")[this.character.url.split("/").length - 2];
  }
  get name(): string {
    return this.character.name;
  }
  get description(): string {
    return `
    - Altura: ${this.character.height} 
    - Peso: ${this.character.mass} 
    - Año de nacimiento: ${this.character.birth_year} 
    - Género: ${this.character.gender}`;
  }

  get homeworld(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.character.homeworld);
  }

  get films(): string[] {
    return this.character.films.map(film => this.replaceEndpointsService.replaceEndpoints(film));
  }

  get species(): string[] {
    return this.character.species;
  }

  get starships(): string[] {
    return this.character.starships.map(starship => this.replaceEndpointsService.replaceEndpoints(starship));
  }

  get created(): string {
    return this.character.created;
  }

  get edited(): string {
    return this.character.edited;
  }

  get url(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.character.url);
  }
}
