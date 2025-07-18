import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/health")
  async getHealth(): Promise<{
    app: {
      status: string;
    };
    starWarsApi: {
      status: string;
      url?: string | null;
    };
  }> {
    return await this.appService.getHealth();
  }
}
