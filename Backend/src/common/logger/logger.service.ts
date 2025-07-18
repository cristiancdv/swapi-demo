import { Injectable } from "@nestjs/common";
import * as winston from "winston";
import { ConfigService } from "@nestjs/config";
import { winstonConfig } from "./logger.config";

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  private context: string = "LoggerService";

  constructor(private readonly configService: ConfigService) {
    const config = winstonConfig(this.configService);
    this.logger = winston.createLogger({
      level: config.level,
      transports: config.transports,
      format: winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.errors({ stack: true }), winston.format.json()),
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context: context || this.context });
  }

  error(message: string, stack?: string, context?: string) {
    this.logger.error(message, { context: context || this.context, stack });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || this.context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || this.context });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context: context || this.context });
  }
  setContext(context: string) {
    this.context = context;
  }
  logHttpRequest(method: string, url: string, statusCode: number, duration: number, logContext?: object) {
    const level = statusCode >= 400 ? "warn" : "info";
    this.logger[level](`${method} ${url} ${statusCode}`, {
      context: "HTTP",
      ...logContext,
      method,
      url,
      statusCode,
      duration,
    });
  }
}
