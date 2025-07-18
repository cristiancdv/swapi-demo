import { FilmsData } from "../../infra/axios/types/films-data/films-data";
import { CharacterData } from "../../infra/axios/types/character-data/character-data";
import { PlanetsData } from "../../infra/axios/types/planets-data/planets-data";
import { ShipData } from "../../infra/axios/types/ship-data/ship-data";

export class MovieEntityDetails {
  constructor(private readonly movie: FilmsData) {}

  get count(): number {
    return this.movie.count;
  }

  get id(): string {
    return this.movie.url.split("/")[this.movie.url.split("/").length - 2];
  }
  get title(): string {
    return this.movie.title;
  }

  get description(): string {
    return `
    - Título: ${this.movie.title}
    - Episodio: ${this.movie.episode_id}
    - Director: ${this.movie.director}
    - Productor: ${this.movie.producer}`;
  }

  get characters(): CharacterData[] {
    return this.movie.characters;
  }

  get planets(): PlanetsData[] {
    return this.movie.planets;
  }

  get starships(): ShipData[] {
    return this.movie.starships;
  }

  get created(): string {
    return this.movie.created;
  }

  get edited(): string {
    return this.movie.edited;
  }

  get url(): string {
    return this.movie.url;
  }
}
