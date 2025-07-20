import { Injectable } from "@nestjs/common";
import { MoviesEntityDetails } from "../../domain/movies/movies.entity";
import { MovieEntityDetails } from "../../domain/movies/movie.entity";
import { MovieRepository } from "../../domain/movies/movie.repository";
import { GetMovieDto } from "./dto/get-movie.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Injectable()
export class GetMovieUseCase {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(id: GetMovieDto): Promise<MovieEntityDetails> {
    const response = await this.movieRepository.getMovie(id);
    const movie = new MovieEntityDetails(response, this.replaceEndpointsService);
    return {
      id: movie.id,
      title: movie.title,
      episode_id: movie.episode_id,
      opening_crawl: movie.opening_crawl,
      director: movie.director,
      producer: movie.producer,
      characters: movie.characters,
      planets: movie.planets,
      starships: movie.starships,
      created: movie.created,
      edited: movie.edited,
      url: movie.url,
    } as MovieEntityDetails;
  }
}

@Injectable()
export class GetAllMoviesUseCase {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly replaceEndpointsService: ReplaceEndpointsService,
  ) {}

  async execute(page: number): Promise<PaginatedResponse<MoviesEntityDetails>> {
    const { count, results } = await this.movieRepository.getAllMovies(page);
    return {
      count,
      results: results.map(movie => {
        const movieEntity = new MoviesEntityDetails(movie, this.replaceEndpointsService);
        return {
          id: movieEntity.id,
          title: movieEntity.title,
          description: movieEntity.description,
          characters: movieEntity.characters,
          planets: movieEntity.planets,
          starships: movieEntity.starships,
          created: movieEntity.created,
          edited: movieEntity.edited,
          url: movieEntity.url,
        } as MoviesEntityDetails;
      }),
    };
  }
}
