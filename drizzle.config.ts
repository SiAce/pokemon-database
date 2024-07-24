import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './data/sqlite/pokemon.db', 
  }
})