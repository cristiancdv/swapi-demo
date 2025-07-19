import { Controller, Get, Param, ParseIntPipe, Query, DefaultValuePipe } from "@nestjs/common";
import { MoviesService } from "../../../app/movies/movies.service";
import { MoviesEntityDetails } from "@/domain/movies/movies.entity";
import { MovieEntityDetails } from "@/domain/movies/movie.entity";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number): Promise<PaginatedResponse<MoviesEntityDetails>> {
    return this.moviesService.findAll(page);
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<MovieEntityDetails> {
    return this.moviesService.findOne({ id });
  }
}
