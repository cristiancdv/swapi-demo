import { IsBoolean, IsNumber, IsString, IsArray, Min, Max } from "class-validator";
import AppConfigInterface from "../interface/app-config.interface";
import { Type } from "class-transformer";

export class AppConfigDto implements AppConfigInterface {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(65535)
  readonly port: number;

  @Type(() => Boolean)
  @IsBoolean()
  readonly cluster: boolean;

  @Type(() => Boolean)
  @IsBoolean()
  readonly isLocalEnvironment: boolean;

  @Type(() => String)
  @IsString()
  readonly corsAllowOrigin: string;

  @Type(() => String)
  @IsString()
  readonly globalPrefix: string;

  @Type(() => Array)
  @IsArray()
  readonly method: string[];

  @Type(() => String)
  @IsString()
  readonly logLevel: string;

  @Type(() => String)
  @IsString()
  readonly logFile: string;
}
