import { parseCsvFile } from "./csv-parse";

const tableCsvPaths: [string][] = [
  ["data/csv/growth_rates.csv"],
  ["data/csv/pokemon_habitats.csv"],
  ["data/csv/pokemon_shapes.csv"],
  ["data/csv/pokemon_colors.csv"],
  ["data/csv/move_targets.csv"],
  ["data/csv/move_damage_class_prose.csv"],
  ["data/csv/move_effects.csv"],
  ["data/csv/stats.csv"],
  ["data/csv/contest_types.csv"],
  ["data/csv/contest_effects.csv"],
  ["data/csv/super_contest_effects.csv"],
  ["data/csv/pokemon_move_methods.csv"],
  ["data/csv/item_pockets.csv"],
  ["data/csv/item_categories.csv"],
  ["data/csv/item_fling_effects.csv"],
  ["data/csv/items.csv"],
  ["data/csv/evolution_chains.csv"],
  ["data/csv/regions.csv"],
  ["data/csv/generations.csv"],
  ["data/csv/generation_names.csv"],
  ["data/csv/version_groups.csv"],
  ["data/csv/versions.csv"],
  ["data/csv/pokemon_species.csv"],
  ["data/csv/pokemon.csv"],
  ["data/csv/types.csv"],
  ["data/csv/pokemon_types.csv"],
  ["data/csv/abilities.csv"],
  ["data/csv/pokemon_abilities.csv"],
  ["data/csv/pokemon_forms.csv"],
  ["data/csv/pokemon_game_indices.csv"],
  ["data/csv/pokemon_items.csv"],
  ["data/csv/moves.csv"],
  ["data/csv/pokemon_moves.csv"],
  ["data/csv/pokemon_stats.csv"],
];

const [
  GrowthRate,
  PokemonHabitat,
  PokemonShape,
  PokemonColor,
  MoveTarget,
  MoveDamageClassProse,
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
  GenerationName,
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
] = await Promise.all(tableCsvPaths.map(([csvFilePath]) => parseCsvFile(csvFilePath)));

const PokemonById = {};
for (let i = 0; i < Pokemon.length; i++) {
  Pokemon[i].prev = Pokemon[i - 1]?.id;
  Pokemon[i].next = Pokemon[i + 1]?.id;
  PokemonById[Pokemon[i].id] = Pokemon[i];
}

const PokemonSpeciesById = {};
for (let i = 0; i < PokemonSpecies.length; i++) {
  PokemonSpeciesById[PokemonSpecies[i].id] = PokemonSpecies[i];
}

const PokemonSpeciesByEvolutionChain = {};
for (let i = 0; i < PokemonSpecies.length; i++) {
  if (PokemonSpecies[i].evolution_chain_id in PokemonSpeciesByEvolutionChain) {
    PokemonSpeciesByEvolutionChain[PokemonSpecies[i].evolution_chain_id].push(PokemonSpecies[i]);
  } else {
    PokemonSpeciesByEvolutionChain[PokemonSpecies[i].evolution_chain_id] = [PokemonSpecies[i]];
  }
}

const PokemonMoveByPokemonId = {};
for (let i = 0; i < PokemonMove.length; i++) {
  if (PokemonMove[i].pokemon_id in PokemonMoveByPokemonId) {
    PokemonMoveByPokemonId[PokemonMove[i].pokemon_id].push(PokemonMove[i]);
  } else {
    PokemonMoveByPokemonId[PokemonMove[i].pokemon_id] = [PokemonMove[i]];
  }
}

const PokemonTypeByPokemonId = {};
for (let i = 0; i < PokemonType.length; i++) {
  if (PokemonType[i].pokemon_id in PokemonTypeByPokemonId) {
    PokemonTypeByPokemonId[PokemonType[i].pokemon_id].push(PokemonType[i]);
  } else {
    PokemonTypeByPokemonId[PokemonType[i].pokemon_id] = [PokemonType[i]];
  }
}

const PokemonAbilityByPokemonId = {};
for (let i = 0; i < PokemonAbility.length; i++) {
  if (PokemonAbility[i].pokemon_id in PokemonAbilityByPokemonId) {
    PokemonAbilityByPokemonId[PokemonAbility[i].pokemon_id].push(PokemonAbility[i]);
  } else {
    PokemonAbilityByPokemonId[PokemonAbility[i].pokemon_id] = [PokemonAbility[i]];
  }
}

const PokemonStatByPokemonId = {};
for (let i = 0; i < PokemonStat.length; i++) {
  if (PokemonStat[i].pokemon_id in PokemonStatByPokemonId) {
    PokemonStatByPokemonId[PokemonStat[i].pokemon_id].push(PokemonStat[i]);
  } else {
    PokemonStatByPokemonId[PokemonStat[i].pokemon_id] = [PokemonStat[i]];
  }
}

const MoveById = {};
for (let i = 0; i < Move.length; i++) {
  MoveById[Move[i].id] = Move[i];
}

const TypeById = {};
for (let i = 0; i < Type.length; i++) {
  TypeById[Type[i].id] = Type[i];
}

const AbilityById = {};
for (let i = 0; i < Ability.length; i++) {
  AbilityById[Ability[i].id] = Ability[i];
}

const StatById = {};
for (let i = 0; i < Stat.length; i++) {
  StatById[Stat[i].id] = Stat[i];
}

const GenerationNameById = {};
for (let i = 0; i < GenerationName.length; i++) {
  const { generation_id, local_language_id, name } = GenerationName[i];
  if (generation_id in GenerationNameById) {
    GenerationNameById[generation_id][local_language_id] = name;
  } else {
    GenerationNameById[generation_id] = { [local_language_id]: name };
  }
}

const MoveDamageClassProseById = {};
for (let i = 0; i < MoveDamageClassProse.length; i++) {
  const { move_damage_class_id, local_language_id, name, description } = MoveDamageClassProse[i];
  if (move_damage_class_id in MoveDamageClassProseById) {
    MoveDamageClassProseById[move_damage_class_id][local_language_id] = { name, description };
  } else {
    MoveDamageClassProseById[move_damage_class_id] = { [local_language_id]: { name, description } };
  }
}

const VersionGroupById = {};
for (let i = 0; i < VersionGroup.length; i++) {
  VersionGroupById[VersionGroup[i].id] = VersionGroup[i];
}

const PokemonMoveMethodById = {};
for (let i = 0; i < PokemonMoveMethod.length; i++) {
  PokemonMoveMethodById[PokemonMoveMethod[i].id] = PokemonMoveMethod[i];
}

export {
  GrowthRate,
  PokemonHabitat,
  PokemonShape,
  PokemonColor,
  MoveTarget,
  MoveDamageClassProseById,
  MoveEffect,
  Stat,
  StatById,
  ContestType,
  ContextEffect,
  SuperContextEffect,
  PokemonMoveMethod,
  PokemonMoveMethodById,
  ItemPocket,
  ItemCategory,
  ItemFlingEffect,
  Item,
  EvolutionChain,
  Region,
  Generation,
  GenerationNameById,
  VersionGroup,
  VersionGroupById,
  Version,
  PokemonSpecies,
  PokemonSpeciesById,
  PokemonSpeciesByEvolutionChain,
  Pokemon,
  PokemonById,
  Type,
  TypeById,
  PokemonType,
  PokemonTypeByPokemonId,
  Ability,
  AbilityById,
  PokemonAbility,
  PokemonAbilityByPokemonId,
  PokemonForm,
  PokemonGameIndex,
  PokemonItem,
  Move,
  MoveById,
  PokemonMove,
  PokemonMoveByPokemonId,
  PokemonStat,
  PokemonStatByPokemonId,
};
