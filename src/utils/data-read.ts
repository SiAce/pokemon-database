import { parseCsvFile } from "./csv-parse";
import { LANGUAGE_ID } from "./language";

const tableCsvPaths: [string][] = [
  ["data/csv/abilities.csv"],
  ["data/csv/encounter_condition_value_map.csv"],
  ["data/csv/encounter_condition_values.csv"],
  ["data/csv/encounter_conditions.csv"],
  ["data/csv/encounter_methods.csv"],
  ["data/csv/encounter_slots.csv"],
  ["data/csv/encounters.csv"],
  ["data/csv/evolution_chains.csv"],
  ["data/csv/generation_names.csv"],
  ["data/csv/generations.csv"],
  ["data/csv/growth_rates.csv"],
  ["data/csv/item_categories.csv"],
  ["data/csv/item_fling_effects.csv"],
  ["data/csv/item_pockets.csv"],
  ["data/csv/items.csv"],
  ["data/csv/location_areas.csv"],
  ["data/csv/locations.csv"],
  ["data/csv/move_damage_class_prose.csv"],
  ["data/csv/move_effects.csv"],
  ["data/csv/move_targets.csv"],
  ["data/csv/moves.csv"],
  ["data/csv/pokemon_abilities.csv"],
  ["data/csv/pokemon_colors.csv"],
  ["data/csv/pokemon_forms.csv"],
  ["data/csv/pokemon_game_indices.csv"],
  ["data/csv/pokemon_habitats.csv"],
  ["data/csv/pokemon_items.csv"],
  ["data/csv/pokemon_move_method_prose.csv"],
  ["data/csv/pokemon_moves.csv"],
  ["data/csv/pokemon_shapes.csv"],
  ["data/csv/pokemon_species.csv"],
  ["data/csv/pokemon_stats.csv"],
  ["data/csv/pokemon_types.csv"],
  ["data/csv/pokemon.csv"],
  ["data/csv/regions.csv"],
  ["data/csv/stats.csv"],
  ["data/csv/type_efficacy.csv"],
  ["data/csv/types.csv"],
  ["data/csv/version_groups.csv"],
  ["data/csv/version_names.csv"],
  ["data/csv/versions.csv"],
];

const [
  Ability,
  encounter_condition_value_map,
  encounter_condition_values,
  encounter_conditions,
  encounter_methods,
  encounter_slots,
  encounters,
  EvolutionChain,
  GenerationName,
  Generation,
  GrowthRate,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
  Item,
  location_areas,
  locations,
  MoveDamageClassProse,
  MoveEffect,
  MoveTarget,
  Move,
  PokemonAbility,
  PokemonColor,
  PokemonForm,
  PokemonGameIndex,
  PokemonHabitat,
  PokemonItem,
  PokemonMoveMethodProse,
  PokemonMove,
  PokemonShape,
  PokemonSpecies,
  PokemonStat,
  PokemonType,
  Pokemon,
  Region,
  Stat,
  TypeEfficacy,
  Type,
  VersionGroup,
  VersionName,
  Version,
] = await Promise.all(tableCsvPaths.map(([csvFilePath]) => parseCsvFile(csvFilePath)));

const AbilityById = {};
for (let i = 0; i < Ability.length; i++) {
  AbilityById[Ability[i].id] = Ability[i];
}

const encounter_condition_value_map_by_encounter_id = {};
for (let i = 0; i < encounter_condition_value_map.length; i++) {
  if (encounter_condition_value_map[i].encounter_id in encounter_condition_value_map_by_encounter_id) {
    encounter_condition_value_map_by_encounter_id[encounter_condition_value_map[i].encounter_id].push(
      encounter_condition_value_map[i]
    );
  } else {
    encounter_condition_value_map_by_encounter_id[encounter_condition_value_map[i].encounter_id] = [
      encounter_condition_value_map[i],
    ];
  }
}

const encounter_condition_values_by_id = {};
for (let i = 0; i < encounter_condition_values.length; i++) {
  encounter_condition_values_by_id[encounter_condition_values[i].id] = encounter_condition_values[i];
}

const encounter_methods_by_id = {};
for (let i = 0; i < encounter_methods.length; i++) {
  encounter_methods_by_id[encounter_methods[i].id] = encounter_methods[i];
}

const encounter_slots_by_id = {};
for (let i = 0; i < encounter_slots.length; i++) {
  encounter_slots_by_id[encounter_slots[i].id] = encounter_slots[i];
}

const encounter_version_ids_by_pokemon_id = {};
const encounters_grouped = {};
for (let i = 0; i < encounters.length; i++) {
  const encounter = encounters[i];
  const { pokemon_id, version_id, location_area_id } = encounter;
  const encounter_hash =
    encounter_slots_by_id[encounter.encounter_slot_id].encounter_method_id +
    "|" +
    encounter_condition_value_map_by_encounter_id[encounter.id]?.join();

  if (pokemon_id in encounter_version_ids_by_pokemon_id) {
    encounter_version_ids_by_pokemon_id[pokemon_id].add(version_id);
  } else {
    encounter_version_ids_by_pokemon_id[pokemon_id] = new Set([version_id]);
  }

  if (pokemon_id in encounters_grouped) {
    if (location_area_id in encounters_grouped[pokemon_id]) {
      if (version_id in encounters_grouped[pokemon_id][location_area_id]) {
        if (!encounters_grouped[pokemon_id][location_area_id][version_id].has(encounter_hash)) {
          encounters_grouped[pokemon_id][location_area_id][version_id].set(encounter_hash, encounter);
        }
      } else {
        encounters_grouped[pokemon_id][location_area_id][version_id] = new Map([[encounter_hash, encounter]]);
      }
    } else {
      encounters_grouped[pokemon_id][location_area_id] = { [version_id]: new Map([[encounter_hash, encounter]]) };
    }
  } else {
    encounters_grouped[pokemon_id] = { [location_area_id]: { [version_id]: new Map([[encounter_hash, encounter]]) } };
  }
}

const GenerationNameById = {};
for (let i = 0; i < GenerationName.length; i++) {
  const { generation_id, local_language_id, name } = GenerationName[i];
  if (local_language_id === LANGUAGE_ID) {
    GenerationNameById[generation_id] = name;
  }
}

const location_areas_by_id = {};
for (let i = 0; i < location_areas.length; i++) {
  location_areas_by_id[location_areas[i].id] = location_areas[i];
}

const location_by_id = {};
for (let i = 0; i < locations.length; i++) {
  location_by_id[locations[i].id] = locations[i];
}

const MoveDamageClassProseById = {};
for (let i = 0; i < MoveDamageClassProse.length; i++) {
  const { move_damage_class_id, local_language_id, name, description } = MoveDamageClassProse[i];
  if (local_language_id === LANGUAGE_ID) {
    MoveDamageClassProseById[move_damage_class_id] = { name, description };
  }
}

const MoveById = {};
for (let i = 0; i < Move.length; i++) {
  MoveById[Move[i].id] = Move[i];
}

const PokemonAbilityByPokemonId = {};
for (let i = 0; i < PokemonAbility.length; i++) {
  const pokemon_ability = PokemonAbility[i];
  if (pokemon_ability.pokemon_id in PokemonAbilityByPokemonId) {
    PokemonAbilityByPokemonId[pokemon_ability.pokemon_id].push(pokemon_ability);
  } else {
    PokemonAbilityByPokemonId[pokemon_ability.pokemon_id] = [pokemon_ability];
  }
}

const PokemonMoveMethodProseById = {};
for (let i = 0; i < PokemonMoveMethodProse.length; i++) {
  if (PokemonMoveMethodProse[i].local_language_id === LANGUAGE_ID) {
    PokemonMoveMethodProseById[PokemonMoveMethodProse[i].pokemon_move_method_id] = PokemonMoveMethodProse[i];
  }
}

const PokemonMoveGrouped = {};
const VersionGroupIdByPokemon = {};
for (let i = 0; i < PokemonMove.length; i++) {
  const pokemon_move = PokemonMove[i];
  const { pokemon_id, version_group_id, move_id, pokemon_move_method_id } = pokemon_move;
  if (pokemon_id in VersionGroupIdByPokemon) {
    VersionGroupIdByPokemon[pokemon_id].add(version_group_id);
  } else {
    VersionGroupIdByPokemon[pokemon_id] = new Set([version_group_id]);
  }

  if (pokemon_id in PokemonMoveGrouped) {
    if (pokemon_move_method_id in PokemonMoveGrouped[pokemon_id]) {
      if (move_id in PokemonMoveGrouped[pokemon_id][pokemon_move_method_id]) {
        if (version_group_id in PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id]) {
          PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id][version_group_id].push(pokemon_move);
        } else {
          PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id][version_group_id] = [pokemon_move];
        }
      } else {
        PokemonMoveGrouped[pokemon_id][pokemon_move_method_id][move_id] = { [version_group_id]: [pokemon_move] };
      }
    } else {
      PokemonMoveGrouped[pokemon_id][pokemon_move_method_id] = { [move_id]: { [version_group_id]: [pokemon_move] } };
    }
  } else {
    PokemonMoveGrouped[pokemon_id] = {
      [pokemon_move_method_id]: { [move_id]: { [version_group_id]: [pokemon_move] } },
    };
  }
}

const PokemonSpeciesById = {};
const PokemonSpeciesByEvolutionChain = {};
const PokemonSpeciesByGenerationId = {};
for (let i = 0; i < PokemonSpecies.length; i++) {
  const pokemonSpecies = PokemonSpecies[i];
  PokemonSpeciesById[pokemonSpecies.id] = pokemonSpecies;
  if (pokemonSpecies.evolution_chain_id in PokemonSpeciesByEvolutionChain) {
    PokemonSpeciesByEvolutionChain[pokemonSpecies.evolution_chain_id].push(pokemonSpecies);
  } else {
    PokemonSpeciesByEvolutionChain[pokemonSpecies.evolution_chain_id] = [pokemonSpecies];
  }
  if (pokemonSpecies.generation_id in PokemonSpeciesByGenerationId) {
    PokemonSpeciesByGenerationId[pokemonSpecies.generation_id].push(pokemonSpecies);
  } else {
    PokemonSpeciesByGenerationId[pokemonSpecies.generation_id] = [pokemonSpecies];
  }
}

const PokemonStatByPokemonId = {};
for (let i = 0; i < PokemonStat.length; i++) {
  const pokemon_stat = PokemonStat[i];
  if (pokemon_stat.pokemon_id in PokemonStatByPokemonId) {
    PokemonStatByPokemonId[pokemon_stat.pokemon_id].push(pokemon_stat);
  } else {
    PokemonStatByPokemonId[pokemon_stat.pokemon_id] = [pokemon_stat];
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

const PokemonById = {};
for (let i = 0; i < Pokemon.length; i++) {
  const pokemon = Pokemon[i];
  pokemon.prev = Pokemon[i - 1]?.id;
  pokemon.next = Pokemon[i + 1]?.id;
  PokemonById[pokemon.id] = pokemon;
}

const StatById = {};
for (let i = 0; i < Stat.length; i++) {
  StatById[Stat[i].id] = Stat[i];
}

const TypeById = {};
for (let i = 0; i < Type.length; i++) {
  const type = Type[i];
  type.prev = Type[i - 1]?.id;
  type.next = Type[i + 1]?.id;
  TypeById[type.id] = type;
}

const TypeEfficacyByAttack = {};
const TypeEfficacyByDefense = {};
for (let i = 0; i < TypeEfficacy.length; i++) {
  const type_efficacy = TypeEfficacy[i];
  const { damage_type_id, target_type_id } = type_efficacy;
  if (damage_type_id in TypeEfficacyByAttack) {
    TypeEfficacyByAttack[damage_type_id].push(type_efficacy);
  } else {
    TypeEfficacyByAttack[damage_type_id] = [type_efficacy];
  }
  if (target_type_id in TypeEfficacyByDefense) {
    TypeEfficacyByDefense[target_type_id].push(type_efficacy);
  } else {
    TypeEfficacyByDefense[target_type_id] = [type_efficacy];
  }
}

const VersionGroupById = {};
const VersionGroupByGenerationId = {};
for (let i = 0; i < VersionGroup.length; i++) {
  const version_group = VersionGroup[i];
  VersionGroupById[version_group.id] = version_group;
  if (version_group.generation_id in VersionGroupByGenerationId) {
    VersionGroupByGenerationId[version_group.generation_id].push(version_group);
  } else {
    VersionGroupByGenerationId[version_group.generation_id] = [version_group];
  }
}

const VersionNameById = {};
for (let i = 0; i < VersionName.length; i++) {
  if (VersionName[i].local_language_id === LANGUAGE_ID) {
    VersionNameById[VersionName[i].version_id] = VersionName[i];
  }
}

const VersionByVersionGroup = {};
for (let i = 0; i < Version.length; i++) {
  const version = Version[i];
  if (version.version_group_id in VersionByVersionGroup) {
    VersionByVersionGroup[version.version_group_id].push(version);
  } else {
    VersionByVersionGroup[version.version_group_id] = [version];
  }
}

export {
  Ability,
  AbilityById,
  encounter_condition_value_map_by_encounter_id,
  encounter_condition_values_by_id,
  encounter_methods_by_id,
  encounter_slots_by_id,
  encounter_version_ids_by_pokemon_id,
  encounters_grouped,
  EvolutionChain,
  Generation,
  GenerationNameById,
  GrowthRate,
  Item,
  ItemCategory,
  ItemFlingEffect,
  ItemPocket,
  location_areas_by_id,
  location_by_id,
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
