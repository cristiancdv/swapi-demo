import { FilmsData } from "../films-data/films-data";
import { PlanetsData } from "../planets-data/planets-data";
import { ShipData } from "../ship-data/ship-data";

export interface CharacterData {
  count: number;
  id: string;
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: PlanetsData;
  films: FilmsData[];
  species: string[];
  vehicles: string[];
  starships: ShipData[];
  created: string;
  edited: string;
  url: string;
}
