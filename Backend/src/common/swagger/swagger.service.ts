import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const swaggerBuilder = (app: INestApplication, config: ConfigService) => {
  const apiPathSwagger = "/docs";
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Star Wars API")
    .setDescription("Star Wars API is a API for the Star Wars API from TDD and Clean-Nest-Architecture")
    .setVersion(config.get<string>("app.globalPrefix") as string)
    .addBearerAuth();

  const swconfig = swaggerConfig.build();

  const document = SwaggerModule.createDocument(app, swconfig);
  SwaggerModule.setup(apiPathSwagger, app, document);
};
