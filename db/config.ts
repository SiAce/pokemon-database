import { defineDb, defineTable, column } from "astro:db";

const GrowthRate = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    formula: column.text(),
  },
});

const PokemonHabitat = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const PokemonShape = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const PokemonColor = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const MoveTarget = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const MoveDamageClass = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const MoveEffect = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
  },
});

const ContestType = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const ContextEffect = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    appeal: column.number(),
    jam: column.number(),
  },
});

const SuperContextEffect = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    appeal: column.number(),
  },
});

const PokemonMoveMethod = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const ItemPocket = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const ItemCategory = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    pocket_id: column.number({ references: () => ItemPocket.columns.id }),
  },
});

const ItemFlingEffect = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const Item = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    category_id: column.number({ references: () => ItemCategory.columns.id }),
    cost: column.number(),
    fling_power: column.number({ optional: true }),
    fling_effect_id: column.number({
      references: () => ItemFlingEffect.columns.id,
      optional: true,
    }),
  },
});

const EvolutionChain = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    baby_trigger_item_id: column.number({ references: () => Item.columns.id, optional: true }),
  },
});

const Region = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  },
});

const Generation = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    main_region_id: column.number({ references: () => Region.columns.id }),
  },
});

const VersionGroup = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    order: column.number(),
  },
});

const Version = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    version_group_id: column.number({
      references: () => VersionGroup.columns.id,
    }),
  },
});

const PokemonSpecies = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    evolves_from_species_id: column.number({ optional: true }),
    evolution_chain_id: column.number({ references: () => EvolutionChain.columns.id }),
    color_id: column.number({ references: () => PokemonColor.columns.id }),
    shape_id: column.number({ references: () => PokemonShape.columns.id, optional: true }),
    habitat_id: column.number({ references: () => PokemonHabitat.columns.id, optional: true }),
    gender_rate: column.number(),
    capture_rate: column.number(),
    base_happiness: column.number({ optional: true }),
    is_baby: column.boolean(),
    hatch_counter: column.number({ optional: true }),
    has_gender_differences: column.boolean(),
    growth_rate_id: column.number({ references: () => GrowthRate.columns.id }),
    forms_switchable: column.boolean(),
    is_legendary: column.boolean(),
    is_mythical: column.boolean(),
    order: column.number(),
    conquest_order: column.number({ optional: true }),
  },
});

const Pokemon = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.number(),
    species_id: column.number({ references: () => PokemonSpecies.columns.id }),
    height: column.number(),
    weight: column.number(),
    base_experience: column.number({ optional: true }),
    order: column.number({ optional: true }),
    is_default: column.boolean(),
  },
});

const Type = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    damage_class_id: column.number({ references: () => MoveDamageClass.columns.id, optional: true }),
  },
});

const PokemonType = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    type_id: column.number({ references: () => Type.columns.id }),
    slot: column.number(),
  },
  indexes: [{ on: ["pokemon_id"] }],
});

const Ability = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    is_main_series: column.boolean(),
  },
});

const PokemonAbility = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    ability_id: column.number({ references: () => Ability.columns.id }),
    is_hidden: column.boolean(),
    slot: column.number(),
  },
  indexes: [{ on: ["pokemon_id"] }],
});

const PokemonForm = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    form_identifier: column.text({ optional: true }),
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    introduced_in_version_group_id: column.number({
      references: () => VersionGroup.columns.id,
    }),
    is_default: column.boolean(),
    is_battle_only: column.boolean(),
    is_mega: column.boolean(),
    form_order: column.number(),
    order: column.number(),
  },
});

const PokemonGameIndex = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    version_id: column.number({ references: () => Version.columns.id }),
    game_index: column.number(),
  },
  indexes: [{ on: ["pokemon_id"] }],
});

const PokemonItem = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    version_id: column.number({ references: () => Version.columns.id }),
    item_id: column.number({ references: () => Item.columns.id }),
    rarity: column.number(),
  },
  indexes: [{ on: ["pokemon_id"] }],
});

const Move = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    type_id: column.number({ references: () => Type.columns.id }),
    power: column.number({ optional: true }),
    pp: column.number({ optional: true }),
    accuracy: column.number({ optional: true }),
    priority: column.number(),
    target_id: column.number({ references: () => MoveTarget.columns.id }),
    damage_class_id: column.number({ references: () => MoveDamageClass.columns.id }),
    effect_id: column.number({ references: () => MoveEffect.columns.id, optional: true }),
    effect_chance: column.number({ optional: true }),
    contest_type_id: column.number({ references: () => ContestType.columns.id, optional: true }),
    contest_effect_id: column.number({ references: () => ContextEffect.columns.id, optional: true }),
    super_contest_effect_id: column.number({ references: () => SuperContextEffect.columns.id, optional: true }),
  },
});

const PokemonMove = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    version_group_id: column.number({ references: () => VersionGroup.columns.id }),
    move_id: column.number({ references: () => Move.columns.id }),
    pokemon_move_method_id: column.number({ references: () => PokemonMoveMethod.columns.id }),
    level: column.number(),
    order: column.number({ optional: true }),
  },
  indexes: [{ on: ["pokemon_id"] }],
});

export default defineDb({
  tables: {
    GrowthRate,
    PokemonHabitat,
    PokemonShape,
    PokemonColor,
    MoveTarget,
    MoveDamageClass,
    MoveEffect,
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
  },
});
