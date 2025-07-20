import { FilmsData } from "../../infra/axios/types/films-data/films-data";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

export class MoviesEntityDetails {
  constructor(
    private readonly movie: FilmsData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

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
    - Episodio: ${this.movie.episode_id}
    - Director: ${this.movie.director}
    - Productor: ${this.movie.producer}`;
  }

  get characters(): string[] {
    return this.movie.characters.map(character => this.replaceEndpointsService.replaceEndpoints(character));
  }

  get planets(): string[] {
    return this.movie.planets.map(planet => this.replaceEndpointsService.replaceEndpoints(planet));
  }

  get starships(): string[] {
    return this.movie.starships.map(starship => this.replaceEndpointsService.replaceEndpoints(starship));
  }

  get created(): string {
    return this.movie.created;
  }

  get edited(): string {
    return this.movie.edited;
  }

  get url(): string {
    return this.replaceEndpointsService.replaceEndpoints(this.movie.url);
  }
}
