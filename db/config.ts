import { defineDb, defineTable, column } from 'astro:db';

const Pokemon = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.number(),
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
    generation_id: column.number(),
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
    { on: ["pokemon_id"]}
  ]
});

const Ability = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    identifier: column.text(),
    generation_id: column.number(),
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
    { on: ["pokemon_id"]}
  ]
});


export default defineDb({
  tables: { Pokemon, Type, PokemonType, Ability, PokemonAbility },
})