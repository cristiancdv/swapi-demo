import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";

function calculateResponseSize(data: any): number {
  if (typeof data === "string") {
    return Buffer.byteLength(data, "utf8");
  }
  return Buffer.byteLength(JSON.stringify(data), "utf8");
}

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();
    const method = request.method;
    const url = request.url;
    const ip = request.ip;
    const userAgent = request.headers["user-agent"];

    return next.handle().pipe(
      tap(data => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode;

        // Log de request exitosa
        this.logger.logHttpRequest(method, url, statusCode, duration, {
          ip,
          userAgent,
          responseSize: calculateResponseSize(data),
        });
      }),
      catchError(error => {
        const duration = Date.now() - startTime;
        const statusCode = (error as { status?: number }).status || 500;

        // Log de error en request
        this.logger.error(`${method} ${url} failed`, error instanceof Error ? error.stack : undefined, "HTTP");
        this.logger.logHttpRequest(method, url, statusCode, duration, {
          ip,
          userAgent,
          error: error instanceof Error ? error.message : String(error),
          errorType: (error as { constructor?: { name?: string } })?.constructor?.name || "Unknown",
        });

        throw error;
      }),
    );
  }
}
