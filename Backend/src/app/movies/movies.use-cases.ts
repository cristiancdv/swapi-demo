import { Injectable } from "@nestjs/common";
import { MovieEntityDetails } from "../../domain/movies/movie.entity";
import { MovieRepository } from "../../domain/movies/movie.repository";
import { GetMovieDto } from "./dto/get-movie.dto";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class GetMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: GetMovieDto): Promise<MovieEntityDetails> {
    const response = await this.movieRepository.getMovie(id);
    const movie = new MovieEntityDetails(response);
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
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
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(page: number): Promise<PaginatedResponse<MovieEntityDetails>> {
    const response = await this.movieRepository.getAllMovies(page);
    const count = response.count;
    return {
      count,
      results: response.results.map(movie => {
        const movieEntity = new MovieEntityDetails(movie);
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
        } as MovieEntityDetails;
      }),
    };
  }
}
