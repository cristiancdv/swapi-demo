import { Injectable } from "@nestjs/common";
import { GetMovieDto } from "./dto/get-movie.dto";
import { GetMovieUseCase, GetAllMoviesUseCase } from "./movies.use-cases";
import { MovieEntityDetails } from "@/domain/movies/movie.entity";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class MoviesService {
  constructor(
    private readonly getMovieUseCase: GetMovieUseCase,
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
  ) {}

  async findAll(page: number): Promise<PaginatedResponse<MovieEntityDetails>> {
    return await this.getAllMoviesUseCase.execute(page);
  }

  async findOne(id: GetMovieDto): Promise<MovieEntityDetails> {
    return await this.getMovieUseCase.execute(id);
  }
}
