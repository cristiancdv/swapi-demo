import { Injectable } from "@nestjs/common";
import { GetMovieDto } from "../../app/movies/dto/get-movie.dto";
import { AxiosService } from "../../infra/axios/axios.service";
import { FilmsData } from "../../infra/axios/types/films-data/films-data";
import { PaginatedResponse } from "@/infra/axios/types/paginated.types";

@Injectable()
export class MovieRepository {
  constructor(private readonly swapiService: AxiosService) {}

  async getMovie({ id }: GetMovieDto): Promise<FilmsData> {
    if (!id) {
      throw new Error("ID is required");
    }
    return await this.swapiService.get<FilmsData>("films", id);
  }

  async getAllMovies(page: number): Promise<PaginatedResponse<FilmsData>> {
    return await this.swapiService.getAll<FilmsData>("films", page);
  }
}
