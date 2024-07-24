import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

const sqlite = new Database('./data/sqlite/pokemon.db')
sqlite.exec('PRAGMA journal_mode = WAL;')
sqlite.exec('PRAGMA synchronous = normal;')
sqlite.exec('PRAGMA temp_store = memory;')
sqlite.exec('PRAGMA mmap_size = 1000000000;')
export const bunDb = drizzle(sqlite)