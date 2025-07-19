import { Module } from "@nestjs/common";
import { ReplaceEndpointsService } from "./replace-endpoints/replace-endpoints.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  providers: [ReplaceEndpointsService],
})
export class UtilsModule {}
