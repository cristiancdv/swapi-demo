import { Module } from "@nestjs/common";
import { MoviesService } from "../../../app/movies/movies.service";
import { MoviesController } from "./movies.controller";
import { GetMovieUseCase, GetAllMoviesUseCase } from "@/app/movies/movies.use-cases";
import { MovieRepository } from "@/domain/movies/movie.repository";
import { AxiosModule } from "@/infra/axios/axios.module";

@Module({
  imports: [AxiosModule],
  controllers: [MoviesController],
  providers: [MoviesService, GetMovieUseCase, GetAllMoviesUseCase, MovieRepository],
})
export class MoviesModule {}
