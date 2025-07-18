import { Module } from "@nestjs/common";
import { AxiosService } from "./axios.service";
import { ConfigService } from "@nestjs/config";
import { StarWarsUrlDto } from "../../config/enviroments/dto/swapi-config.dto";

@Module({
  providers: [
    AxiosService,
    {
      inject: [ConfigService],
      provide: "STAR_WARS_API_ENV",
      useFactory: (configService: ConfigService): StarWarsUrlDto => {
        const credentials = configService.get<StarWarsUrlDto>("starWarsApi");
        return credentials ?? ({} as StarWarsUrlDto);
      },
    },
  ],
  exports: [AxiosService],
})
export class AxiosModule {}
