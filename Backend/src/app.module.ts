import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggerModule } from "./common/logger/logger.module";
import { validateEnv } from "./config/enviroments/env.validate";
import { CharactersModule } from "./interfaces/http/characters/characters.module";
import { ShipsModule } from "./interfaces/http/ships/ships.module";
import { PlanetsModule } from "./interfaces/http/planets/planets.module";
import { MoviesModule } from "./interfaces/http/movies/movies.module";
import { AxiosModule } from "./infra/axios/axios.module";
import { CacheModule } from "@nestjs/cache-manager";
import { ConfigMap } from "./config/enviroments/types/enviroment";
import { CacheConfigDto } from "./config/enviroments/dto/cache-config.dto";
import { UtilsModule } from "./utils/utils.module";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<ConfigMap>) => {
        const config = configService.get("cache") as CacheConfigDto;
        return {
          ttl: config.ttl,
          max: config.max,
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    LoggerModule,
    CharactersModule,
    ShipsModule,
    PlanetsModule,
    MoviesModule,
    AxiosModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
