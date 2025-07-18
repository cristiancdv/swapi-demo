import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { AppConfigDto } from "./dto/app-config.dto";
import { ConfigMap } from "./types/enviroment";
import { StarWarsUrlDto } from "./dto/swapi-config.dto";
import { CacheConfigDto } from "./dto/cache-config.dto";

export function validateEnv(config: Record<string, unknown>) {
  const methodsAvailable = config.APP_METHOD as string;

  const variables: Record<keyof ConfigMap, any> = {
    app: {
      port: config.APP_PORT as number,
      cluster: config.APP_CLUSTER as boolean,
      isLocalEnvironment: config.APP_IS_LOCAL_ENVIRONMENT as boolean,
      corsAllowOrigin: config.APP_CORS_ALLOW_ORIGIN as string,
      globalPrefix: config.APP_GLOBAL_PREFIX as string,
      method: methodsAvailable.split(","),
      logLevel: config.APP_LOG_LEVEL as string,
      logFile: config.APP_LOG_FILE as string,
    },
    starWarsApi: {
      protocol: config.STAR_WARS_API_PROTOCOL as string,
      domain: config.STAR_WARS_API_DOMAIN as string,
      prefix: config.STAR_WARS_API_PREFIX as string,
    },
    cache: {
      ttl: config.CACHE_TTL as number,
      max: config.CACHE_MAX as number,
    },
  };
  const validateConfig: Partial<ConfigMap> = {
    app: plainToInstance(AppConfigDto, variables.app, {
      enableImplicitConversion: true,
    }),
    starWarsApi: plainToInstance(StarWarsUrlDto, variables.starWarsApi, {
      enableImplicitConversion: true,
    }),
    cache: plainToInstance(CacheConfigDto, variables.cache, {
      enableImplicitConversion: true,
    }),
  };

  Object.keys(variables).forEach(key => {
    const errorKey = validateSync(validateConfig[key] as object);
    if (errorKey.length > 0) throw new Error(errorKey.toString());
  });

  return validateConfig;
}
