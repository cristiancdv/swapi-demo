import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ReplaceEndpointsService {
  constructor(private readonly configService: ConfigService) {}

  replaceEndpoints(url: string) {
    const prefix = this.configService.get<string>("app.globalPrefix") ?? "";
    return url
      .replace("https://swapi.dev/api", "/" + prefix)
      .replace("starships", "ships")
      .replace("films", "movies")
      .replace("people", "characters");
  }
}
