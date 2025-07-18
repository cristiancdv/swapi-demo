import { AppConfigDto } from "../dto/app-config.dto";
import { StarWarsUrlDto } from "../dto/swapi-config.dto";
import { CacheConfigDto } from "../dto/cache-config.dto";

export type ConfigMap = {
  app: AppConfigDto;
  starWarsApi: StarWarsUrlDto;
  cache: CacheConfigDto;
};
