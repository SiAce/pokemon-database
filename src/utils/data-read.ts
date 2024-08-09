import { parseCsvFile } from "./csv-parse";
import { LANGUAGE_ID } from "./language";

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
  ["data/csv/pokemon_move_method_prose.csv"],
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
  ["data/csv/version_names.csv"],
  ["data/csv/pokemon_species.csv"],
  ["data/csv/pokemon.csv"],
  ["data/csv/types.csv"],
  ["data/csv/type_efficacy.csv"],
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
  PokemonMoveMethodProse,
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
  VersionName,
  PokemonSpecies,
  Pokemon,
  Type,
  TypeEfficacy,
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
const PokemonSpeciesByEvolutionChain = {};
const PokemonSpeciesByGenerationId = {};
for (let i = 0; i < PokemonSpecies.length; i++) {
  PokemonSpeciesById[PokemonSpecies[i].id] = PokemonSpecies[i];
  if (PokemonSpecies[i].evolution_chain_id in PokemonSpeciesByEvolutionChain) {
    PokemonSpeciesByEvolutionChain[PokemonSpecies[i].evolution_chain_id].push(PokemonSpecies[i]);
  } else {
    PokemonSpeciesByEvolutionChain[PokemonSpecies[i].evolution_chain_id] = [PokemonSpecies[i]];
  }
  if (PokemonSpecies[i].generation_id in PokemonSpeciesByGenerationId) {
    PokemonSpeciesByGenerationId[PokemonSpecies[i].generation_id].push(PokemonSpecies[i]);
  } else {
    PokemonSpeciesByGenerationId[PokemonSpecies[i].generation_id] = [PokemonSpecies[i]];
  }
}

const PokemonMoveGrouped = {};
const VersionGroupIdByPokemon = {};
for (let i = 0; i < PokemonMove.length; i++) {
  const { pokemon_id, version_group_id, move_id, pokemon_move_method_id } = PokemonMove[i];
  if (pokemon_id in VersionGroupIdByPokemon) {
    VersionGroupIdByPokemon[pokemon_id].add(version_group_id);
  } else {
    VersionGroupIdByPokemon[pokemon_id] = new Set([version_group_id]);
  }

  if (pokemon_id in PokemonMoveGrouped) {
    if (pokemon_move_method_id in PokemonMoveGrouped[pokemon_id]) {
      if (move_id in PokemonMoveGrouped[pokemon_id][pokemon_move_method_id]) {
        if (version_group_id in PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id]) {
          PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id][version_group_id].push(PokemonMove[i]);
        } else {
          PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id][version_group_id] = [PokemonMove[i]];
        }
      } else {
        PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id] = { [version_group_id]: [PokemonMove[i]] };
      }
    } else {
      PokemonMoveGrouped[pokemon_id][pokemon_move_method_id] = { [move_id]: { [version_group_id]: [PokemonMove[i]] } };
    }
  } else {
    PokemonMoveGrouped[pokemon_id] = {
      [pokemon_move_method_id]: { [move_id]: { [version_group_id]: [PokemonMove[i]] } },
    };
  }
}

const PokemonTypeByPokemonId = {};
const PokemonTypeByType = {};
for (let i = 0; i < PokemonType.length; i++) {
  const pokemonType = PokemonType[i];
  if (pokemonType.pokemon_id in PokemonTypeByPokemonId) {
    PokemonTypeByPokemonId[pokemonType.pokemon_id].push(pokemonType);
  } else {
    PokemonTypeByPokemonId[pokemonType.pokemon_id] = [pokemonType];
  }

  if (pokemonType.type_id in PokemonTypeByType) {
    PokemonTypeByType[pokemonType.type_id].push(pokemonType);
  } else {
    PokemonTypeByType[pokemonType.type_id] = [pokemonType];
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
  Type[i].prev = Type[i - 1]?.id;
  Type[i].next = Type[i + 1]?.id;
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
  if (local_language_id === LANGUAGE_ID) {
    GenerationNameById[generation_id] = name;
  }
}

const MoveDamageClassProseById = {};
for (let i = 0; i < MoveDamageClassProse.length; i++) {
  const { move_damage_class_id, local_language_id, name, description } = MoveDamageClassProse[i];
  if (local_language_id === LANGUAGE_ID) {
    MoveDamageClassProseById[move_damage_class_id] = { name, description };
  }
}

const VersionGroupById = {};
const VersionGroupByGenerationId = {};
for (let i = 0; i < VersionGroup.length; i++) {
  VersionGroupById[VersionGroup[i].id] = VersionGroup[i];
  if (VersionGroup[i].generation_id in VersionGroupByGenerationId) {
    VersionGroupByGenerationId[VersionGroup[i].generation_id].push(VersionGroup[i]);
  } else {
    VersionGroupByGenerationId[VersionGroup[i].generation_id] = [VersionGroup[i]];
  }
}

const VersionByVersionGroup = {};
for (let i = 0; i < Version.length; i++) {
  if (Version[i].version_group_id in VersionByVersionGroup) {
    VersionByVersionGroup[Version[i].version_group_id].push(Version[i]);
  } else {
    VersionByVersionGroup[Version[i].version_group_id] = [Version[i]];
  }
}

const VersionNameById = {};
for (let i = 0; i < VersionName.length; i++) {
  if (VersionName[i].local_language_id === LANGUAGE_ID) {
    VersionNameById[VersionName[i].version_id] = VersionName[i];
  }
}

const PokemonMoveMethodProseById = {};
for (let i = 0; i < PokemonMoveMethodProse.length; i++) {
  if (PokemonMoveMethodProse[i].local_language_id === LANGUAGE_ID) {
    PokemonMoveMethodProseById[PokemonMoveMethodProse[i].pokemon_move_method_id] = PokemonMoveMethodProse[i];
  }
}

const TypeEfficacyByAttack = {};
const TypeEfficacyByDefense = {};
for (let i = 0; i < TypeEfficacy.length; i++) {
  const { damage_type_id, target_type_id } = TypeEfficacy[i];
  if (damage_type_id in TypeEfficacyByAttack) {
    TypeEfficacyByAttack[damage_type_id].push(TypeEfficacy[i]);
  } else {
    TypeEfficacyByAttack[damage_type_id] = [TypeEfficacy[i]];
  }
  if (target_type_id in TypeEfficacyByDefense) {
    TypeEfficacyByDefense[target_type_id].push(TypeEfficacy[i]);
  } else {
    TypeEfficacyByDefense[target_type_id] = [TypeEfficacy[i]];
  }
}

export {
  Ability,
  AbilityById,
  ContestType,
  ContextEffect,
  EvolutionChain,
  Generation,
  GenerationNameById,
  GrowthRate,
  Item,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
  Move,
  MoveById,
  MoveDamageClassProseById,
  MoveEffect,
  MoveTarget,
  Pokemon,
  PokemonAbility,
  PokemonAbilityByPokemonId,
  PokemonById,
  PokemonColor,
  PokemonForm,
  PokemonGameIndex,
  PokemonHabitat,
  PokemonItem,
  PokemonMove,
  PokemonMoveGrouped,
  PokemonMoveMethodProse,
  PokemonMoveMethodProseById,
  PokemonShape,
  PokemonSpecies,
  PokemonSpeciesByEvolutionChain,
  PokemonSpeciesByGenerationId,
  PokemonSpeciesById,
  PokemonStat,
  PokemonStatByPokemonId,
  PokemonType,
  PokemonTypeByPokemonId,
  PokemonTypeByType,
  Region,
  Stat,
  StatById,
  SuperContextEffect,
  Type,
  TypeById,
  TypeEfficacy,
  TypeEfficacyByAttack,
  TypeEfficacyByDefense,
  Version,
  VersionByVersionGroup,
  VersionGroup,
  VersionGroupByGenerationId,
  VersionGroupById,
  VersionGroupIdByPokemon,
  VersionNameById,
};
