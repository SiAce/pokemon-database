import { db, Region, Generation, VersionGroup, Version, Pokemon, Type, PokemonType, Ability, PokemonAbility, PokemonForm, PokemonGameIndex } from 'astro:db';
import { parseCsvFile } from '../src/utils/csv-parse';

const tableCsvPaths = [
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
]

export default async function () {
  const tableDatas = await Promise.all(
    tableCsvPaths.map(([, csvFilePath, fastMode]) => parseCsvFile(csvFilePath as any, fastMode ? true : false))
  )
  tableCsvPaths.map(async ([tableConfig], i) => await db.insert(tableConfig as any).values(tableDatas[i]))
}