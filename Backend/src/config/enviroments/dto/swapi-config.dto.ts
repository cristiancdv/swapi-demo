import { Type } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { StarWarsUrlInterface } from "../interface/swapi-config.interface";

export class StarWarsUrlDto implements StarWarsUrlInterface {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  protocol: "http" | "https";

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  domain: string;

  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  prefix: string;
}
