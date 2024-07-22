import {
  db,
  ItemPocket,
  ItemCategory,
  ItemFlingEffect,
  Item,
  Region,
  Generation,
  VersionGroup,
  Version,
  Pokemon,
  Type,
  PokemonType,
  Ability,
  PokemonAbility,
  PokemonForm,
  PokemonGameIndex,
  PokemonItem,
} from "astro:db";
import { parseCsvFile } from "../src/utils/csv-parse";

const tableCsvPaths = [
  [ItemPocket, "data/csv/item_pockets.csv"],
  [ItemCategory, "data/csv/item_categories.csv"],
  [ItemFlingEffect, "data/csv/item_fling_effects.csv"],
  [Item, "data/csv/items.csv"],
  [Region, "data/csv/regions.csv"],
  [Generation, "data/csv/generations.csv"],
  [VersionGroup, "data/csv/version_groups.csv"],
  [Version, "data/csv/versions.csv"],
  [Pokemon, "data/csv/pokemon.csv"],
  [Type, "data/csv/types.csv"],
  [PokemonType, "data/csv/pokemon_types.csv"],
  [Ability, "data/csv/abilities.csv"],
  [PokemonAbility, "data/csv/pokemon_abilities.csv"],
  [PokemonForm, "data/csv/pokemon_forms.csv"],
  [PokemonGameIndex, "data/csv/pokemon_game_indices.csv"],
  [PokemonItem, "data/csv/pokemon_items.csv"],
];

export default async function () {
  const tableDatas = await Promise.all(
    tableCsvPaths.map(([, csvFilePath, fastMode]) => parseCsvFile(csvFilePath as any, fastMode ? true : false))
  );
  tableCsvPaths.map(async ([tableConfig], i) => await db.insert(tableConfig as any).values(tableDatas[i]));
}
