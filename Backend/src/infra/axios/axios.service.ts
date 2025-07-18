import { Inject, Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { Agent } from "https";
import { LoggerService } from "../../common/logger/logger.service";
import { StarWarsUrlInterface } from "../../config/enviroments/interface/swapi-config.interface";
import { PaginatedResponse } from "./types/paginated.types";

@Injectable()
export class AxiosService {
  private url: string;
  private axiosInstance: AxiosInstance;

  constructor(
    @Inject("STAR_WARS_API_ENV") private readonly starWarsApiEnv: StarWarsUrlInterface,
    private readonly logger: LoggerService,
  ) {
    void this.checkUrl().then(url => {
      if (url) {
        this.url = url;
      }
    });
  }

  async getAll<T>(endpoint: string, page: number): Promise<PaginatedResponse<T>> {
    const url = page ? `${this.url}/${endpoint}?page=${page}` : `${this.url}/${endpoint}`;

    const response = await this.axiosInstance.get(url);
    const data = response.data as PaginatedResponse<T>;
    return { results: data.results, count: data.count };
  }

  async get<T>(endpoint: string, id: string): Promise<T> {
    const url = `${this.url}/${endpoint}/${id}/`;
    const response = await this.axiosInstance.get<T>(url);
    return response.data;
  }

  async checkUrl() {
    const urlhttps = `${this.starWarsApiEnv.protocol}${this.starWarsApiEnv.domain}/${this.starWarsApiEnv.prefix}`;
    try {
      const response = await axios.get(urlhttps);
      if (response.status === 200) {
        this.logger.log(`URL is valid: ${urlhttps}`, "AxiosService");
        this.axiosInstance = axios.create({
          baseURL: urlhttps,
        });
        this.axiosInstance.create({
          baseURL: urlhttps,
        });
        return urlhttps;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      this.logger.warn(`URL is not valid: ${urlhttps} - ${errorMessage} - try with http`, "AxiosService");
      this.logger.debug(`HTTPS connection failed: ${errorMessage}`, "AxiosService");
    }

    const http = `http://${this.starWarsApiEnv.domain}/${this.starWarsApiEnv.prefix}`;
    try {
      const httpsAgent = new Agent({ rejectUnauthorized: false });
      const response = await axios.get(http, { httpsAgent });
      if (response.status === 200) {
        this.logger.log(`URL is valid: ${http}`, "AxiosService");
        this.axiosInstance = axios.create({
          baseURL: http,
          httpsAgent,
        });
        return http;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(`URL is not valid: ${http} - ${errorMessage}`, errorStack, "AxiosService");
      throw new Error("URL is not valid");
    }
  }
}
