import { CharacterData } from "../character-data/character-data";
import { PlanetsData } from "../planets-data/planets-data";
import { ShipData } from "../ship-data/ship-data";

export interface FilmsData {
  count: number;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  species: string[];
  starships: ShipData[];
  vehicles: string[];
  characters: CharacterData[];
  planets: PlanetsData[];
  url: string;
  created: string;
  edited: string;
}
