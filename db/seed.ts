import { bunDb } from "./bun-sqlite";
import { parseCsvFile } from "../src/utils/csv-parse";
import {
  GrowthRate,
  PokemonHabitat,
  PokemonShape,
  PokemonColor,
  MoveTarget,
  MoveDamageClass,
  MoveEffect,
  Stat,
  ContestType,
  ContextEffect,
  SuperContextEffect,
  PokemonMoveMethod,
  ItemPocket,
  ItemCategory,
  ItemFlingEffect,
  Item,
  EvolutionChain,
  Region,
  Generation,
  VersionGroup,
  Version,
  PokemonSpecies,
  Pokemon,
  Type,
  PokemonType,
  Ability,
  PokemonAbility,
  PokemonForm,
  PokemonGameIndex,
  PokemonItem,
  Move,
  PokemonMove,
  PokemonStat,
} from "./schema";
import type { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";

const TABLE_INSERT_CHUNK_SIZE = 5000;
const tableCsvPaths: [SQLiteTableWithColumns<any>, string, boolean?][] = [
  [GrowthRate, "data/csv/growth_rates.csv", false],
  [PokemonHabitat, "data/csv/pokemon_habitats.csv"],
  [PokemonShape, "data/csv/pokemon_shapes.csv"],
  [PokemonColor, "data/csv/pokemon_colors.csv"],
  [MoveTarget, "data/csv/move_targets.csv"],
  [MoveDamageClass, "data/csv/move_damage_classes.csv"],
  [MoveEffect, "data/csv/move_effects.csv"],
  [Stat, "data/csv/stats.csv"],
  [ContestType, "data/csv/contest_types.csv"],
  [ContextEffect, "data/csv/contest_effects.csv"],
  [SuperContextEffect, "data/csv/super_contest_effects.csv"],
  [PokemonMoveMethod, "data/csv/pokemon_move_methods.csv"],
  [ItemPocket, "data/csv/item_pockets.csv"],
  [ItemCategory, "data/csv/item_categories.csv"],
  [ItemFlingEffect, "data/csv/item_fling_effects.csv"],
  [Item, "data/csv/items.csv"],
  [EvolutionChain, "data/csv/evolution_chains.csv"],
  [Region, "data/csv/regions.csv"],
  [Generation, "data/csv/generations.csv"],
  [VersionGroup, "data/csv/version_groups.csv"],
  [Version, "data/csv/versions.csv"],
  [PokemonSpecies, "data/csv/pokemon_species.csv"],
  [Pokemon, "data/csv/pokemon.csv"],
  [Type, "data/csv/types.csv"],
  [PokemonType, "data/csv/pokemon_types.csv"],
  [Ability, "data/csv/abilities.csv"],
  [PokemonAbility, "data/csv/pokemon_abilities.csv"],
  [PokemonForm, "data/csv/pokemon_forms.csv"],
  [PokemonGameIndex, "data/csv/pokemon_game_indices.csv"],
  [PokemonItem, "data/csv/pokemon_items.csv"],
  [Move, "data/csv/moves.csv"],
  [PokemonMove, "data/csv/pokemon_moves.csv"],
  [PokemonStat, "data/csv/pokemon_stats.csv"],
];

// const tableDatas =
await Promise.all(
  tableCsvPaths.map(async ([tableConfig, csvFilePath, fastMode]) => {
    const tableData = await parseCsvFile(csvFilePath, fastMode === false ? false : true);
    if (tableData.length <= TABLE_INSERT_CHUNK_SIZE) {
      return bunDb.insert(tableConfig).values(tableData);
    }

    const chunkInsertOperations = [];

    for (let offset = 0; offset < tableData.length; offset += TABLE_INSERT_CHUNK_SIZE) {
      const tableDataChunk = tableData.slice(offset, offset + TABLE_INSERT_CHUNK_SIZE);
      chunkInsertOperations.push(bunDb.insert(tableConfig).values(tableDataChunk));
    }

    return Promise.all(chunkInsertOperations);
  })
);
// // await Promise.all(
// tableCsvPaths.map(async ([tableConfig], i) => {
//   const tableData = tableDatas[i];
//   if (tableData.length <= TABLE_INSERT_CHUNK_SIZE) {
//     return bunDb.insert(tableConfig).values(tableDatas[i]);
//   }

//   for (let offset = 0; offset < tableData.length; offset += TABLE_INSERT_CHUNK_SIZE) {
//     const tableDataChunk = tableData.slice(offset, offset + TABLE_INSERT_CHUNK_SIZE);
//     await bunDb.insert(tableConfig).values(tableDataChunk);
//   }
// });
// // );
