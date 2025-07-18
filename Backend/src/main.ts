import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppClusterService } from "./common/runtime/cluster.service";
import { ConfigService } from "@nestjs/config";
import { LoggerService } from "./common/logger/logger.service";
import { LoggerInterceptor } from "./common/interceptor/logger.interceptor";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { swaggerBuilder } from "./common/swagger/swagger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const logger = app.get(LoggerService);
  const port = configService.get("app.port") as number;
  logger.setContext("Bootstrap");
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerInterceptor(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      enableDebugMessages: true,
      forbidUnknownValues: false,
    }),
  );

  app.enableCors({
    methods: configService.get("app.method") as string[],
    origin: configService.get("app.corsAllowOrigin") as string[],
  });
  app.setGlobalPrefix(configService.get("app.globalPrefix") as string);
  app.use(helmet());
  swaggerBuilder(app, configService);

  await AppClusterService.clusterize(async () => {
    try {
      await app.listen(port);
      logger.log("Application started successfully");
    } catch (err) {
      logger.error("Failed to start application", err instanceof Error ? err.stack : undefined, "Bootstrap");
      process.exit(1);
    }
  }, configService.get("app.cluster"));
}

void bootstrap();
