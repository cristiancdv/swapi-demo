import { IsNotEmpty, IsNumber } from "class-validator";
import { CacheConfigInterface } from "../interface/cache-config.interface";
import { Type } from "class-transformer";

export class CacheConfigDto implements CacheConfigInterface {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  ttl: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  max: number;
}
