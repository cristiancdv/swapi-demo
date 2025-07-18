import { CharacterData } from "../character-data/character-data";
import { FilmsData } from "../films-data/films-data";

export interface ShipData {
  count: number;
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: CharacterData[];
  films: FilmsData[];
  created: string;
  edited: string;
  url: string;
}
