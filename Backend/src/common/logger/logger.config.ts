import { WinstonModuleOptions } from "nest-winston";
import * as winston from "winston";
import { ConfigService } from "@nestjs/config";
import * as DailyRotateFile from "winston-daily-rotate-file";

export const winstonConfig = (configService: ConfigService): WinstonModuleOptions => {
  const logLevel = (configService.get("app.logLevel") as string) || "info";
  const logFile = (configService.get("app.logFile") as string) || "./logs";

  return {
    level: logLevel.toLowerCase(),
    transports: [
      new winston.transports.Console({
        level: logLevel.toLowerCase(),
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),

          winston.format.errors({ stack: true }),
          winston.format.colorize({ all: true }),
          winston.format.printf(({ timestamp, level, message, context, stack, ...meta }) => {
            const ctx = context && typeof context === "string" ? context : "Application";
            let output = `[${String(timestamp)}] ${String(level)} [${ctx}] ${String(message)}`;

            // Handle stack traces
            if (stack && typeof stack === "string") {
              output += `\n${stack}`;
            }

            // Handle metadata
            const cleanMeta = { ...meta };
            delete cleanMeta.stack;
            delete cleanMeta.context;

            if (Object.keys(cleanMeta).length > 0) {
              output += `\n📋 Metadata:`;
              Object.entries(cleanMeta).forEach(([key, value]) => {
                if (typeof value === "object" && value !== null) {
                  try {
                    output += `\n  ${key}: ${JSON.stringify(value, null, 2)}`;
                  } catch (error) {
                    // Handle circular references or other serialization errors
                    if (error instanceof Error && error.message.includes("circular")) {
                      output += `\n  ${key}: [Object with circular reference]`;
                    } else {
                      output += `\n  ${key}: [Object - serialization failed]`;
                    }
                  }
                } else {
                  output += `\n  ${key}: ${String(value)}`;
                }
              });
            }

            return output;
          }),
        ),
      }),
      new DailyRotateFile({
        filename: `${logFile}/error-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        level: "error",
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.errors({ stack: true }),
          winston.format.json(),
          winston.format.prettyPrint(),
        ),
        maxSize: "20m",
        maxFiles: "14d",
        zippedArchive: true,
      }),
      new DailyRotateFile({
        filename: `${logFile}/combined-%DATE%.log`,
        datePattern: "YYYY-MM-DD",
        level: logLevel.toLowerCase(),
        format: winston.format.combine(
          winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          winston.format.errors({ stack: true }),
          winston.format.json(),
          winston.format.prettyPrint(),
        ),
        maxSize: "20m",
        maxFiles: "14d",
        zippedArchive: true,
      }),
    ],
  };
};
