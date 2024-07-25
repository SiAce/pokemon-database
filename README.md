# Version 4

Use drizzle ORM to create Database schema and seed the Database using the source data from CSV files.

## Generate 

Generate migration files from drizzle schema.

```sh
bun run generate
```

## Migrate Database 

Apply migrations in migration files to database.

```sh
bun run migrate
```

## Seed Database

Parse the data from source CSV and write data into tables.

```sh
bun run seed
```

# Issues

While profiling the SQLite, I found a drizzle-kit bug that composite primary key order is not respected: https://github.com/drizzle-team/drizzle-kit-mirror/issues/342#issuecomment-2243385795.

Modified the drizzle-kit package's code to prevent sorting alphabetically.


# Starlight Starter Kit: Basics

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)