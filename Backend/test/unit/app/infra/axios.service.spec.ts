import { Test, TestingModule } from "@nestjs/testing";
import { AxiosService } from "../../../../src/infra/axios/axios.service";
import { LoggerService } from "../../../../src/common/logger/logger.service";
import { StarWarsUrlInterface } from "../../../../src/config/enviroments/interface/swapi-config.interface";
import { CharacterData } from "../../../../src/infra/axios/types/character-data/character-data";
import { FilmsData } from "../../../../src/infra/axios/types/films-data/films-data";
import { PlanetsData } from "../../../../src/infra/axios/types/planets-data/planets-data";
import { ShipData } from "../../../../src/infra/axios/types/ship-data/ship-data";
import { PaginatedResponse } from "../../../../src/infra/axios/types/paginated.types";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AxiosService", () => {
  let service: AxiosService;
  let loggerService: jest.Mocked<LoggerService>;
  let mockStarWarsApiEnv: StarWarsUrlInterface;

  const mockPlanetData: PlanetsData = {
    count: 1,
    name: "Tatooine",
    rotation_period: "23",
    orbital_period: "304",
    diameter: "10465",
    climate: "arid",
    gravity: "1 standard",
    terrain: "desert",
    surface_water: "1",
    population: "200000",
    residents: [],
    films: [],
    created: "2014-12-09T13:50:49.641000Z",
    edited: "2014-12-20T20:58:18.411000Z",
    url: "https://swapi.dev/api/planets/1/",
  };

  const mockShipData: ShipData = {
    count: 1,
    name: "X-wing",
    model: "T-65 X-wing",
    manufacturer: "Incom Corporation",
    cost_in_credits: "149999",
    length: "12.5",
    max_atmosphering_speed: "1050",
    crew: "1",
    passengers: "0",
    cargo_capacity: "110",
    consumables: "1 week",
    hyperdrive_rating: "1.0",
    MGLT: "100",
    starship_class: "Starfighter",
    pilots: [],
    films: [],
    created: "2014-12-12T11:19:05.340000Z",
    edited: "2014-12-20T21:23:49.886000Z",
    url: "https://swapi.dev/api/starships/12/",
  };

  const mockCharacterData: CharacterData = {
    count: 1,
    id: "1",
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: mockPlanetData,
    films: [],
    species: [],
    vehicles: [],
    starships: [mockShipData],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.dev/api/people/1/",
  };

  const mockFilmsData: FilmsData = {
    count: 1,
    title: "A New Hope",
    episode_id: 4,
    opening_crawl: "It is a period of civil war...",
    director: "George Lucas",
    producer: "Gary Kurtz, Rick McCallum",
    release_date: "1977-05-25",
    species: [],
    starships: [mockShipData],
    vehicles: [],
    characters: [mockCharacterData],
    planets: [mockPlanetData],
    url: "https://swapi.dev/api/films/1/",
    created: "2014-12-10T14:23:31.880000Z",
    edited: "2014-12-12T11:24:39.858000Z",
  };

  beforeEach(async () => {
    // Mock LoggerService
    const mockLoggerService = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      info: jest.fn(),
      verbose: jest.fn(),
      setContext: jest.fn(),
      logHttpRequest: jest.fn(),
    };

    // Mock StarWars API environment
    mockStarWarsApiEnv = {
      protocol: "https",
      domain: "swapi.dev",
      prefix: "api",
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AxiosService,
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
        {
          provide: "STAR_WARS_API_ENV",
          useValue: mockStarWarsApiEnv,
        },
      ],
    }).compile();

    service = module.get<AxiosService>(AxiosService);
    loggerService = module.get(LoggerService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe("checkUrl", () => {
    it("should successfully validate HTTPS URL", async () => {
      // Mock successful HTTPS response
      mockedAxios.get.mockResolvedValueOnce({ status: 200 });

      const result = await service.checkUrl();

      expect(result).toBe("https://swapi.dev/api");
      expect(loggerService.log).toHaveBeenCalledWith("URL is valid: https://swapi.dev/api", "AxiosService");
    });

    it("should fallback to HTTP when HTTPS fails", async () => {
      // Mock HTTPS failure
      mockedAxios.get.mockRejectedValueOnce(new Error("HTTPS failed"));
      // Mock successful HTTP response
      mockedAxios.get.mockResolvedValueOnce({ status: 200 });

      const result = await service.checkUrl();

      expect(result).toBe("http://swapi.dev/api");
      expect(loggerService.warn).toHaveBeenCalledWith(expect.stringContaining("URL is not valid: https://swapi.dev/api"), "AxiosService");
      expect(loggerService.log).toHaveBeenCalledWith("URL is valid: http://swapi.dev/api", "AxiosService");
    });

    it("should throw error when both HTTPS and HTTP fail", async () => {
      // Mock both HTTPS and HTTP failures
      mockedAxios.get.mockRejectedValue(new Error("Connection failed"));

      await expect(service.checkUrl()).rejects.toThrow("URL is not valid");
      expect(loggerService.error).toHaveBeenCalled();
    });
  });

  describe("get", () => {
    beforeEach(async () => {
      // Setup successful URL check
      mockedAxios.get.mockResolvedValue({ status: 200 });
      await service.checkUrl();
    });

    it("should get character by ID", async () => {
      // Mock axios instance get method
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockCharacterData }),
      };

      // Use Object.defineProperty to set private property for testing
      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.get<CharacterData>("people", "1");

      expect(result).toEqual(mockCharacterData);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/people/1/");
    });

    it("should get film by ID", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockFilmsData }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.get<FilmsData>("films", "1");

      expect(result).toEqual(mockFilmsData);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/films/1/");
    });

    it("should handle API errors", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockRejectedValue(new Error("API Error")),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await expect(service.get<CharacterData>("people", "999")).rejects.toThrow("API Error");
    });

    it("should construct URL correctly with trailing slash", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockCharacterData }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await service.get<CharacterData>("people", "1");

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/people/1/");
    });
  });

  describe("getAll", () => {
    beforeEach(async () => {
      // Setup successful URL check
      mockedAxios.get.mockResolvedValue({ status: 200 });
      await service.checkUrl();
    });

    it("should get all characters with pagination", async () => {
      const mockResponse: PaginatedResponse<CharacterData> = {
        results: [mockCharacterData],
        count: 1,
      };
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.getAll<CharacterData>("people", 1);

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/people?page=1");
    });

    it("should get all films with pagination", async () => {
      const mockResponse: PaginatedResponse<FilmsData> = {
        results: [mockFilmsData],
        count: 1,
      };
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.getAll<FilmsData>("films", 1);

      expect(result).toEqual(mockResponse);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/films?page=1");
    });

    it("should handle empty results", async () => {
      const mockResponse: PaginatedResponse<CharacterData> = {
        results: [],
        count: 0,
      };
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.getAll<CharacterData>("people", 1);

      expect(result).toEqual(mockResponse);
    });

    it("should handle API errors in getAll", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockRejectedValue(new Error("API Error")),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await expect(service.getAll<CharacterData>("people", 1)).rejects.toThrow("API Error");
    });

    it("should construct URL without page parameter when page is 0", async () => {
      const mockResponse: PaginatedResponse<CharacterData> = {
        results: [mockCharacterData],
        count: 1,
      };
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockResponse }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await service.getAll<CharacterData>("people", 0);

      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/people");
    });
  });

  describe("URL construction", () => {
    it("should construct URLs correctly for different endpoints", async () => {
      // Setup successful URL check
      mockedAxios.get.mockResolvedValue({ status: 200 });
      await service.checkUrl();

      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockCharacterData }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await service.get<CharacterData>("people", "1");
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/people/1/");

      await service.get<FilmsData>("films", "2");
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("https://swapi.dev/api/films/2/");
    });
  });

  describe("Error handling", () => {
    it("should handle network errors gracefully", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockRejectedValue(new Error("Network Error")),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await expect(service.get<CharacterData>("people", "1")).rejects.toThrow("Network Error");
    });

    it("should handle malformed responses", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: null }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      const result = await service.get<CharacterData>("people", "1");
      expect(result).toBeNull();
    });

    it("should handle timeout errors", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockRejectedValue(new Error("Request timeout")),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await expect(service.get<CharacterData>("people", "1")).rejects.toThrow("Request timeout");
    });

    it("should handle 404 errors", async () => {
      const mockAxiosInstance = {
        get: jest.fn().mockRejectedValue(new Error("Request failed with status code 404")),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      await expect(service.get<CharacterData>("people", "999")).rejects.toThrow("Request failed with status code 404");
    });
  });

  describe("Generic type handling", () => {
    it("should work with different generic types", async () => {
      // Setup successful URL check
      mockedAxios.get.mockResolvedValue({ status: 200 });
      await service.checkUrl();

      const mockAxiosInstance = {
        get: jest.fn().mockResolvedValue({ data: mockCharacterData }),
      };

      Object.defineProperty(service, "axiosInstance", {
        value: mockAxiosInstance,
        writable: true,
      });

      // Test with CharacterData
      const characterResult = await service.get<CharacterData>("people", "1");
      expect(characterResult).toEqual(mockCharacterData);

      // Test with FilmsData
      mockAxiosInstance.get.mockResolvedValue({ data: mockFilmsData });
      const filmResult = await service.get<FilmsData>("films", "1");
      expect(filmResult).toEqual(mockFilmsData);
    });
  });

  describe("Service initialization", () => {
    it("should initialize with correct dependencies", () => {
      expect(service).toBeDefined();
      expect(service).toBeInstanceOf(AxiosService);
    });

    it("should have logger service injected", () => {
      expect(loggerService).toBeDefined();
      expect(loggerService.log).toBeDefined();
      expect(loggerService.error).toBeDefined();
      expect(loggerService.warn).toBeDefined();
    });

    it("should have StarWars API environment injected", () => {
      expect(mockStarWarsApiEnv).toBeDefined();
      expect(mockStarWarsApiEnv.protocol).toBe("https");
      expect(mockStarWarsApiEnv.domain).toBe("swapi.dev");
      expect(mockStarWarsApiEnv.prefix).toBe("api");
    });
  });
});
