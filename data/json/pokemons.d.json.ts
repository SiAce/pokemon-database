import pokemons from "./pokemons.json";

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  species_id: number;
  species: string;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: number;
  hatch_counter: number;
  has_gender_differences: number;
  forms_switchable: number;
  is_legendary: number;
  is_mythical: number;
  color: string;
  generation: string;
  types: {
    id: number;
    name: string;
  }[];
  abilities: {
    id: number;
    name: string;
  }[];
  stats: {
    id: number;
    name: string;
    base_stat: number;
    effort: number;
  }[];
  forms: {
    form_name: string;
  }[];
  game_indices: {
    game_index: number;
    version_name: string;
  }[];
  items: {
    item_id: number;
    item_name: string;
  }[];
  moves: {
    move_id: number;
    move_name: string;
  }[];
};

declare const pokemons: Pokemon[];

export default pokemons;
