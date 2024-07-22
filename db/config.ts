import { defineDb, defineTable, column } from 'astro:db';


const Region = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
  }
})

const Generation = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    main_region_id: column.number({ references: () => Region.columns.id }),
  }
})

const VersionGroup = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    order: column.number()
  }
})

const Version = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    version_group_id: column.number({ references: () => VersionGroup.columns.id }),
  }
})

const Pokemon = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.number(),
    // TODO
    species_id: column.number(),
    height: column.number(),
    weight: column.number(),
    base_experience: column.number({ optional: true }),
    order: column.number({ optional: true }),
    is_default: column.boolean(),
  }
});

const Type = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    // TODO
    damage_class_id: column.number({ optional: true })
  }
});

const PokemonType = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    type_id: column.number({ references: () => Type.columns.id }),
    slot: column.number(),
  },
  indexes: [
    { on: ["pokemon_id"] }
  ]
});

const Ability = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number({ references: () => Generation.columns.id }),
    is_main_series: column.boolean()
  }
});

const PokemonAbility = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    ability_id: column.number({ references: () => Ability.columns.id }),
    is_hidden: column.boolean(),
    slot: column.number(),
  },
  indexes: [
    { on: ["pokemon_id"] }
  ]
});

const PokemonForm = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    form_identifier: column.text({ optional: true }),
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    introduced_in_version_group_id: column.number({ references: () => VersionGroup.columns.id }),
    is_default: column.boolean(),
    is_battle_only: column.boolean(),
    is_mega: column.boolean(),
    form_order: column.number(),
    order: column.number(),
  }
})

const PokemonGameIndex = defineTable({
  columns: {
    pokemon_id: column.number({ references: () => Pokemon.columns.id }),
    version_id: column.number({ references: () => Version.columns.id }),
    game_index: column.number(),
  },
  indexes: [
    { on: ["pokemon_id"] }
  ]
})

export default defineDb({
  tables: { Region, Generation, VersionGroup, Version, Pokemon, Type, PokemonType, Ability, PokemonAbility, PokemonForm, PokemonGameIndex },
})