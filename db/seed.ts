import { db, Pokemon, PokemonType, Type, Ability, PokemonAbility } from 'astro:db';
import { parseCsvFile } from '../src/utils/csv-parse';

const tableCsvPaths = [
  [Pokemon, "data/csv/pokemon.csv"],
  [Type, "data/csv/types.csv"],
  [PokemonType, "data/csv/pokemon_types.csv"],
  [Ability, "data/csv/abilities.csv"],
  [PokemonAbility, "data/csv/pokemon_abilities.csv"],
]

export default async function () {
  const tableDatas = await Promise.all(
    tableCsvPaths.map(([, csvFilePath]) => parseCsvFile(csvFilePath as any))
  )
  tableCsvPaths.map(async ([tableConfig,], i) => await db.insert(tableConfig as any).values(tableDatas[i]))
}