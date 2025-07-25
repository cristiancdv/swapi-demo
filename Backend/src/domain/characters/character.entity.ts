import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";
import { CharacterData } from "../../infra/axios/types/character-data/character-data";

export class CharacterEntityDetails {
  constructor(
    private readonly character: CharacterData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get id(): string {
    return this.character.url.split("/")[this.character.url.split("/").length - 2];
  }
  get name(): string {
    return this.character.name;
  }
  get height(): string {
    return this.character.height;
  }
  get mass(): string {
    return this.character.mass;
  }
  get hair_color(): string {
    return this.character.hair_color;
  }
  get skin_color(): string {
    return this.character.skin_color;
  }
  get eye_color(): string {
    return this.character.eye_color;
  }
  get birth_year(): string {
    return this.character.birth_year;
  }
  get gender(): string {
    return this.character.gender;
  }
  get homeworld(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.character.homeworld);
  }
  get films(): string[] {
    return this.character.films.map(film => this.replaceEndpointsService.replaceEndpoints(film));
  }
  get species(): string[] {
    return this.character.species.map(species => this.replaceEndpointsService.replaceEndpoints(species));
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
