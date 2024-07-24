import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from "db/schema";
import Database from 'better-sqlite3';

const sqlite = new Database('./data/sqlite/pokemon.db');
sqlite.exec('PRAGMA journal_mode = WAL;')
sqlite.exec('PRAGMA synchronous = normal;')
sqlite.exec('PRAGMA temp_store = memory;')
sqlite.exec('PRAGMA mmap_size = 300000000;')
export const db = drizzle(sqlite, {schema});
