import { Injectable } from "@nestjs/common";
import { AxiosService } from "./infra/axios/axios.service";

@Injectable()
export class AppService {
  constructor(private readonly axiosService: AxiosService) {}
  async getHealth(): Promise<{
    app: {
      status: string;
    };
    starWarsApi: {
      status: string;
      url?: string | null;
    };
  }> {
    const url = await this.axiosService.checkUrl();
    const status = {
      app: {
        status: "OK",
      },
      starWarsApi: {
        status: "OK",
        url,
      },
    };
    return status;
  }
}
