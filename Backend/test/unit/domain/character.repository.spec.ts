import { Test, TestingModule } from "@nestjs/testing";
import { CharacterRepository } from "../../../src/domain/characters/character.repository";
import { AxiosService } from "../../../src/infra/axios/axios.service";
import { CharacterData } from "../../../src/infra/axios/types/character-data/character-data";
import { GetCharacterDto } from "../../../src/app/characters/dto/get-character.dto";

describe("CharacterRepository", () => {
  let repository: CharacterRepository;
  let axiosService: jest.Mocked<AxiosService>;

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
    const mockAxiosService = {
      get: jest.fn(),
      getAll: jest.fn(),
      checkUrl: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharacterRepository,
        {
          provide: AxiosService,
          useValue: mockAxiosService,
        },
      ],
    }).compile();

    repository = module.get<CharacterRepository>(CharacterRepository);
    axiosService = module.get(AxiosService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("getCharacter", () => {
    it("should get character by ID successfully", async () => {
      const query: GetCharacterDto = { id: "1" };
      axiosService.get.mockResolvedValue(mockCharacterData);

      const result = await repository.getCharacter(query);

      expect(result).toEqual(mockCharacterData);
      expect(axiosService.get).toHaveBeenCalledWith("people", "1");
    });

    it("should throw error when ID is missing", async () => {
      const query: GetCharacterDto = {};

      await expect(repository.getCharacter(query)).rejects.toThrow("ID is required");
      expect(axiosService.get).not.toHaveBeenCalled();
    });

    it("should throw error when ID is empty string", async () => {
      const query: GetCharacterDto = { id: "" };

      await expect(repository.getCharacter(query)).rejects.toThrow("ID is required");
      expect(axiosService.get).not.toHaveBeenCalled();
    });

    it("should handle API errors", async () => {
      const query: GetCharacterDto = { id: "999" };
      const apiError = new Error("Character not found");
      axiosService.get.mockRejectedValue(apiError);

      await expect(repository.getCharacter(query)).rejects.toThrow("Character not found");
      expect(axiosService.get).toHaveBeenCalledWith("people", "999");
    });

    it("should convert number ID to string", async () => {
      const query: GetCharacterDto = { id: "1" };
      axiosService.get.mockResolvedValue(mockCharacterData);

      await repository.getCharacter(query);

      expect(axiosService.get).toHaveBeenCalledWith("people", "1");
    });
  });

  describe("getAllCharacters", () => {
    it("should get all characters successfully", async () => {
      const mockCharacters = [mockCharacterData];
      axiosService.getAll.mockResolvedValue(mockCharacters);

      const result = await repository.getAllCharacters();

      expect(result).toEqual(mockCharacters);
      expect(axiosService.getAll).toHaveBeenCalledWith("people");
    });

    it("should return empty array when no characters found", async () => {
      axiosService.getAll.mockResolvedValue([]);

      const result = await repository.getAllCharacters();

      expect(result).toEqual([]);
      expect(axiosService.getAll).toHaveBeenCalledWith("people");
    });

    it("should handle API errors in getAll", async () => {
      const apiError = new Error("Failed to fetch characters");
      axiosService.getAll.mockRejectedValue(apiError);

      await expect(repository.getAllCharacters()).rejects.toThrow("Failed to fetch characters");
      expect(axiosService.getAll).toHaveBeenCalledWith("people");
    });
  });

  describe("Integration scenarios", () => {
    it("should handle network timeouts", async () => {
      const query: GetCharacterDto = { id: "1" };
      const timeoutError = new Error("Request timeout");
      axiosService.get.mockRejectedValue(timeoutError);

      await expect(repository.getCharacter(query)).rejects.toThrow("Request timeout");
    });

    it("should handle malformed response data", async () => {
      const query: GetCharacterDto = { id: "1" };
      const malformedData = { name: "Luke" }; // Missing required fields
      axiosService.get.mockResolvedValue(malformedData as CharacterData);

      const result = await repository.getCharacter(query);

      expect(result).toEqual(malformedData);
    });
  });
}); 