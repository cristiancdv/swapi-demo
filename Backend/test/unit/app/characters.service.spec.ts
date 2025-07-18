import { Test, TestingModule } from "@nestjs/testing";
import { CharactersService } from "../../../src/app/characters/characters.service";
import { CharacterRepository } from "../../../src/domain/characters/character.repository";
import { CharacterEntityDetails } from "../../../src/domain/characters/character.entity";
import { CharacterData } from "../../../src/infra/axios/types/character-data/character-data";
import { GetCharacterDto } from "../../../src/app/characters/dto/get-character.dto";

describe("CharactersService", () => {
  let service: CharactersService;
  let characterRepository: jest.Mocked<CharacterRepository>;

  const mockCharacterData: CharacterData = {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    species: ["https://swapi.dev/api/species/1/"],
    vehicles: ["https://swapi.dev/api/vehicles/14/"],
    starships: ["https://swapi.dev/api/starships/12/"],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  beforeEach(async () => {
    const mockCharacterRepository = {
      getCharacter: jest.fn(),
      getAllCharacters: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: CharacterRepository,
          useValue: mockCharacterRepository,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    characterRepository = module.get(CharacterRepository);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("findOne", () => {
    it("should return character entity details", async () => {
      const query: GetCharacterDto = { id: "1" };
      characterRepository.getCharacter.mockResolvedValue(mockCharacterData);

      const result = await service.findOne(query);

      expect(result).toBeInstanceOf(CharacterEntityDetails);
      expect(result.name).toBe("Luke Skywalker");
      expect(result.height).toBe("172");
      expect(result.mass).toBe("77");
      expect(characterRepository.getCharacter).toHaveBeenCalledWith(query);
    });

    it("should handle repository errors", async () => {
      const query: GetCharacterDto = { id: "999" };
      const error = new Error("Character not found");
      characterRepository.getCharacter.mockRejectedValue(error);

      await expect(service.findOne(query)).rejects.toThrow("Character not found");
      expect(characterRepository.getCharacter).toHaveBeenCalledWith(query);
    });

    it("should handle missing ID validation", async () => {
      const query: GetCharacterDto = {};
      const error = new Error("ID is required");
      characterRepository.getCharacter.mockRejectedValue(error);

      await expect(service.findOne(query)).rejects.toThrow("ID is required");
    });
  });

  describe("findAll", () => {
    it("should return array of character entity details", async () => {
      const mockCharacters = [mockCharacterData];
      characterRepository.getAllCharacters.mockResolvedValue(mockCharacters);

      const result = await service.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(CharacterEntityDetails);
      expect(result[0].name).toBe("Luke Skywalker");
      expect(characterRepository.getAllCharacters).toHaveBeenCalled();
    });

    it("should return empty array when no characters found", async () => {
      characterRepository.getAllCharacters.mockResolvedValue([]);

      const result = await service.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(0);
      expect(characterRepository.getAllCharacters).toHaveBeenCalled();
    });

    it("should handle repository errors in findAll", async () => {
      const error = new Error("Failed to fetch characters");
      characterRepository.getAllCharacters.mockRejectedValue(error);

      await expect(service.findAll()).rejects.toThrow("Failed to fetch characters");
      expect(characterRepository.getAllCharacters).toHaveBeenCalled();
    });
  });

  describe("CharacterEntityDetails", () => {
    it("should correctly map character data properties", async () => {
      const query: GetCharacterDto = { id: "1" };
      characterRepository.getCharacter.mockResolvedValue(mockCharacterData);

      const result = await service.findOne(query);

      expect(result.name).toBe("Luke Skywalker");
      expect(result.height).toBe("172");
      expect(result.mass).toBe("77");
      expect(result.hair_color).toBe("blond");
      expect(result.skin_color).toBe("fair");
      expect(result.eye_color).toBe("blue");
      expect(result.birth_year).toBe("19BBY");
      expect(result.gender).toBe("male");
      expect(result.homeworld).toBe("https://swapi.dev/api/planets/1/");
      expect(result.films).toEqual(["https://swapi.dev/api/films/1/"]);
      expect(result.species).toEqual(["https://swapi.dev/api/species/1/"]);
      expect(result.vehicles).toEqual(["https://swapi.dev/api/vehicles/14/"]);
      expect(result.starships).toEqual(["https://swapi.dev/api/starships/12/"]);
      expect(result.created).toBe("2014-12-09T13:50:51.644000Z");
      expect(result.edited).toBe("2014-12-20T21:17:56.891000Z");
      expect(result.url).toBe("https://swapi.dev/api/people/1/");
    });
  });

  describe("Integration scenarios", () => {
    it("should handle multiple characters in findAll", async () => {
      const mockCharacters = [
        mockCharacterData,
        {
          ...mockCharacterData,
          name: "Leia Organa",
          id: "5",
        },
      ];
      characterRepository.getAllCharacters.mockResolvedValue(mockCharacters);

      const result = await service.findAll();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Luke Skywalker");
      expect(result[1].name).toBe("Leia Organa");
    });

    it("should handle malformed character data gracefully", async () => {
      const malformedData = {
        name: "Luke",
        // Missing other required fields
      } as CharacterData;
      
      const query: GetCharacterDto = { id: "1" };
      characterRepository.getCharacter.mockResolvedValue(malformedData);

      const result = await service.findOne(query);

      expect(result.name).toBe("Luke");
      // Other properties should be undefined but not throw errors
    });
  });
});
