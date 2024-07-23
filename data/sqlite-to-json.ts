import { Database } from "bun:sqlite";

const db = new Database("data/sqlite/pokemon.db", { readonly: true });

const query = db.query(`
-- SQLite
-- SQLite
SELECT
  Pokemon.id,
  Pokemon.identifier as name,
  Pokemon.height,
  Pokemon.weight,
  Pokemon.base_experience,
  Pokemon.species_id,
  PokemonSpecies.identifier as species,
  PokemonSpecies.gender_rate,
  PokemonSpecies.capture_rate,
  PokemonSpecies.base_happiness,
  PokemonSpecies.is_baby,
  PokemonSpecies.hatch_counter,
  PokemonSpecies.has_gender_differences,
  PokemonSpecies.forms_switchable,
  PokemonSpecies.is_legendary,
  PokemonSpecies.is_mythical,
  PokemonColor.identifier as color,
  Generation.identifier as generation,
  (
    SELECT
      json_group_array(
        json_object('id', Type.id, 'name', Type.identifier)
      )
    FROM
      PokemonType
      JOIN Type ON Type.id = PokemonType.type_id
    WHERE
      PokemonType.pokemon_id = Pokemon.id
  ) as types,
  (
    SELECT
      json_group_array(
        json_object('id', Ability.id, 'name', Ability.identifier)
      )
    FROM
      PokemonAbility
      JOIN Ability ON Ability.id = PokemonAbility.ability_id
    WHERE
      PokemonAbility.pokemon_id = Pokemon.id
  ) as abilities,
  (
    SELECT
      json_group_array(
        json_object(
          'id',
          Stat.id,
          'name',
          Stat.identifier,
          'base_stat',
          base_stat,
          'effort',
          effort
        )
      )
    FROM
      PokemonStat
      JOIN Stat ON Stat.id = PokemonStat.stat_id
    WHERE
      PokemonStat.pokemon_id = Pokemon.id
  ) as stats,
  (
    SELECT
      json_group_array(json_object('form_name', identifier))
    FROM
      PokemonForm
    WHERE
      PokemonForm.pokemon_id = Pokemon.id
  ) as forms,
  (
    SELECT
      json_group_array(
        json_object(
          'game_index',
          game_index,
          'version_name',
          Version.identifier
        )
      )
    FROM
      PokemonGameIndex
      JOIN Version ON Version.id = PokemonGameIndex.version_id
    WHERE
      PokemonGameIndex.pokemon_id = Pokemon.id
  ) as game_indices,
  (
    SELECT
      json_group_array(
        DISTINCT json_object('item_id', Item.id, 'item_name', Item.identifier)
      )
    FROM
      PokemonItem
      JOIN Item ON Item.id = PokemonItem.item_id
    WHERE
      PokemonItem.pokemon_id = Pokemon.id
  ) as items,
  (
    SELECT
      json_group_array(
        json_object('move_id', M.id, 'move_name', M.identifier)
      )
    FROM
      (
        SELECT DISTINCT
          Move.id,
          Move.identifier
        FROM
          PokemonMove
          JOIN Move ON Move.id = PokemonMove.move_id
        WHERE
          PokemonMove.pokemon_id = Pokemon.id
      ) M
  ) as moves
FROM
  Pokemon
  JOIN PokemonSpecies ON PokemonSpecies.id = Pokemon.species_id
  JOIN PokemonColor ON PokemonColor.id = PokemonSpecies.color_id
  JOIN Generation ON PokemonSpecies.generation_id = Generation.id

`);

const pokemons = query.all();
const fieldsToParse = ["types", "abilities", "stats", "forms", "game_indices", "items", "moves"];

pokemons.map((pokemon: any) => {
  fieldsToParse.forEach((fieldToParse) => (pokemon[fieldToParse] = JSON.parse(pokemon[fieldToParse])));
});

Bun.write("data/json/pokemons.json", JSON.stringify(pokemons));
