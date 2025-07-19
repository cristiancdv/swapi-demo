import { Module } from "@nestjs/common";
import { CharactersService } from "../../../app/characters/characters.service";
import { CharactersController } from "./characters.controller";
import { GetAllCharactersUseCase, GetCharacterUseCase } from "@/app/characters/characters.use-cases";
import { CharacterRepository } from "@/domain/characters/character.repository";
import { AxiosModule } from "@/infra/axios/axios.module";
import { ReplaceEndpointsService } from "@/utils/replace-endpoints/replace-endpoints.service";

@Module({
  imports: [AxiosModule],
  controllers: [CharactersController],
  providers: [CharactersService, GetCharacterUseCase, CharacterRepository, GetAllCharactersUseCase, ReplaceEndpointsService],
})
export class CharactersModule {}
