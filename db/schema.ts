import { integer, primaryKey, sqliteTable, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";

export const GrowthRate = sqliteTable("GrowthRate", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  formula: text("formula"),
});

export const PokemonHabitat = sqliteTable("PokemonHabitat", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const PokemonShape = sqliteTable("PokemonShape", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const PokemonColor = sqliteTable("PokemonColor", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const MoveTarget = sqliteTable("MoveTarget", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const MoveDamageClass = sqliteTable("MoveDamageClass", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const MoveEffect = sqliteTable("MoveEffect", {
  id: integer("id").primaryKey(),
});

export const Stat = sqliteTable("Stat", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  damage_class_id: integer("id").references(() => MoveDamageClass.id),
  is_battle_only: integer("is_battle_only", { mode: "boolean" }),
  game_index: integer("game_index"),
});

export const ContestType = sqliteTable("ContestType", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const ContextEffect = sqliteTable("ContextEffect", {
  id: integer("id").primaryKey(),
  appeal: integer("appeal"),
  jam: integer("jam"),
});

export const SuperContextEffect = sqliteTable("SuperContextEffect", {
  id: integer("id").primaryKey(),
  appeal: integer("appeal"),
});

export const PokemonMoveMethod = sqliteTable("PokemonMoveMethod", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const ItemPocket = sqliteTable("ItemPocket", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const ItemCategory = sqliteTable("ItemCategory", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  pocket_id: integer("pocket_id").references(() => ItemPocket.id),
});

export const ItemFlingEffect = sqliteTable("ItemFlingEffect", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const Item = sqliteTable("Item", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  category_id: integer("category_id").references(() => ItemCategory.id),
  cost: integer("cost"),
  fling_power: integer("fling_power"),
  fling_effect_id: integer("fling_effect_id").references(() => ItemFlingEffect.id),
});

export const EvolutionChain = sqliteTable("EvolutionChain", {
  id: integer("id").primaryKey(),
  baby_trigger_item_id: integer("baby_trigger_item_id").references(() => Item.id),
});

export const Region = sqliteTable("Region", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
});

export const Generation = sqliteTable("Generation", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  main_region_id: integer("main_region_id").references(() => Region.id),
});

export const VersionGroup = sqliteTable("VersionGroup", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  generation_id: integer("generation_id").references(() => Generation.id),
  order: integer("order"),
});

export const Version = sqliteTable("Version", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  version_group_id: integer("generation_id").references(() => VersionGroup.id),
});

export const PokemonSpecies = sqliteTable("PokemonSpecies", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  generation_id: integer("generation_id").references(() => Generation.id),
  evolves_from_species_id: integer("evolves_from_species_id").references((): AnySQLiteColumn => PokemonSpecies.id),
  evolution_chain_id: integer("evolution_chain_id").references(() => EvolutionChain.id),
  color_id: integer("color_id").references(() => PokemonColor.id),
  shape_id: integer("shape_id").references(() => PokemonShape.id),
  habitat_id: integer("habitat_id").references(() => PokemonHabitat.id),
  gender_rate: integer("gender_rate"),
  capture_rate: integer("capture_rate"),
  base_happiness: integer("base_happiness"),
  is_baby: integer("is_baby", { mode: "boolean" }),
  hatch_counter: integer("hatch_counter"),
  has_gender_differences: integer("has_gender_differences", { mode: "boolean" }),
  growth_rate_id: integer("growth_rate_id").references(() => GrowthRate.id),
  forms_switchable: integer("forms_switchable", { mode: "boolean" }),
  is_legendary: integer("is_legendary", { mode: "boolean" }),
  is_mythical: integer("is_mythical", { mode: "boolean" }),
  order: integer("order"),
  conquest_order: integer("conquest_order"),
});

export const Pokemon = sqliteTable("Pokemon", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  species_id: integer("species_id").references(() => PokemonSpecies.id),
  height: integer("height"),
  weight: integer("weight"),
  base_experience: integer("base_experience"),
  order: integer("order"),
  is_default: integer("is_default", { mode: "boolean" }),
});

export const Type = sqliteTable("Type", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  generation_id: integer("generation_id").references(() => Generation.id),
  damage_class_id: integer("damage_class_id").references(() => MoveDamageClass.id),
});

export const PokemonType = sqliteTable(
  "PokemonType",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    type_id: integer("type_id").references(() => Type.id),
    slot: integer("slot"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pokemon_id, table.type_id] }),
  })
);

export const Ability = sqliteTable("Ability", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  generation_id: integer("generation_id").references(() => Generation.id),
  is_main_series: integer("is_main_series", { mode: "boolean" }),
});

export const PokemonAbility = sqliteTable(
  "PokemonAbility",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    ability_id: integer("ability_id").references(() => Ability.id),
    is_hidden: integer("is_hidden", { mode: "boolean" }),
    slot: integer("slot"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pokemon_id, table.ability_id, table.slot] }),
  })
);

export const PokemonForm = sqliteTable("PokemonForm", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  form_identifier: text("form_identifier"),
  pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
  introduced_in_version_group_id: integer("introduced_in_version_group_id").references(() => VersionGroup.id),
  is_default: integer("is_default", { mode: "boolean" }),
  is_battle_only: integer("is_battle_only", { mode: "boolean" }),
  is_mega: integer("is_mega", { mode: "boolean" }),
  form_order: integer("form_order"),
  order: integer("order"),
});

export const PokemonGameIndex = sqliteTable(
  "PokemonGameIndex",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    version_id: integer("version_id").references(() => Version.id),
    game_index: integer("game_index"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pokemon_id, table.version_id] }),
  })
);

export const PokemonItem = sqliteTable(
  "PokemonItem",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    version_id: integer("version_id").references(() => Version.id),
    item_id: integer("item_id").references(() => Item.id),
    rarity: integer("rarity"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pokemon_id, table.version_id, table.item_id] }),
  })
);

export const Move = sqliteTable("Move", {
  id: integer("id").primaryKey(),
  identifier: text("identifier"),
  generation_id: integer("generation_id").references(() => Generation.id),
  type_id: integer("type_id").references(() => Type.id),
  power: integer("power"),
  pp: integer("pp"),
  accuracy: integer("accuracy"),
  priority: integer("priority"),
  target_id: integer("target_id").references(() => MoveTarget.id),
  damage_class_id: integer("damage_class_id").references(() => MoveDamageClass.id),
  effect_id: integer("effect_id").references(() => MoveEffect.id),
  effect_chance: integer("effect_chance"),
  contest_type_id: integer("contest_type_id").references(() => ContestType.id),
  contest_effect_id: integer("contest_effect_id").references(() => ContextEffect.id),
  super_contest_effect_id: integer("super_contest_effect_id").references(() => SuperContextEffect.id),
});

export const PokemonMove = sqliteTable(
  "PokemonMove",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    version_group_id: integer("version_group_id").references(() => VersionGroup.id),
    move_id: integer("move_id").references(() => Move.id),
    pokemon_move_method_id: integer("pokemon_move_method_id").references(() => PokemonMoveMethod.id),
    level: integer("level"),
    order: integer("order"),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.pokemon_id, table.version_group_id, table.move_id, table.pokemon_move_method_id, table.level],
    }),
  })
);

export const PokemonStat = sqliteTable(
  "PokemonStat",
  {
    pokemon_id: integer("pokemon_id").references(() => Pokemon.id),
    stat_id: integer("stat_id").references(() => Stat.id),
    base_stat: integer("base_stat"),
    effort: integer("effort"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.pokemon_id, table.stat_id] }),
  })
);
