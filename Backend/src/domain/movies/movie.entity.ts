import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";
import { FilmsData } from "../../infra/axios/types/films-data/films-data";

export class MovieEntityDetails {
  constructor(
    private readonly movie: FilmsData,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  get id(): string {
    return this.movie.url.split("/")[this.movie.url.split("/").length - 2];
  }
  get title(): string {
    return this.movie.title;
  }
  get episode_id(): number {
    return this.movie.episode_id;
  }
  get opening_crawl(): string {
    return this.movie.opening_crawl;
  }
  get director(): string {
    return this.movie.director;
  }
  get producer(): string {
    return this.movie.producer;
  }
  get release_date(): string {
    return this.movie.release_date;
  }
  get species(): string[] {
    return this.movie.species.map(species => this.replaceEndpointsService.replaceEndpoints(species));
  }
  get description(): string {
    return this.movie.opening_crawl;
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
