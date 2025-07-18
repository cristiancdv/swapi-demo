import { FilmsData } from "../films-data/films-data";
import { CharacterData } from "../character-data/character-data";

export interface PlanetsData {
  count: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: CharacterData[];
  films: FilmsData[];
  created: string;
  edited: string;
  url: string;
}
