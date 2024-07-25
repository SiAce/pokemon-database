CREATE TABLE `Ability` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`generation_id` integer,
	`is_main_series` integer,
	FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ContestType` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `ContextEffect` (
	`id` integer PRIMARY KEY NOT NULL,
	`appeal` integer,
	`jam` integer
);
--> statement-breakpoint
CREATE TABLE `EvolutionChain` (
	`id` integer PRIMARY KEY NOT NULL,
	`baby_trigger_item_id` integer,
	FOREIGN KEY (`baby_trigger_item_id`) REFERENCES `Item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Generation` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`main_region_id` integer,
	FOREIGN KEY (`main_region_id`) REFERENCES `Region`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `GrowthRate` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`formula` text
);
--> statement-breakpoint
CREATE TABLE `Item` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`category_id` integer,
	`cost` integer,
	`fling_power` integer,
	`fling_effect_id` integer,
	FOREIGN KEY (`category_id`) REFERENCES `ItemCategory`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`fling_effect_id`) REFERENCES `ItemFlingEffect`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ItemCategory` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`pocket_id` integer,
	FOREIGN KEY (`pocket_id`) REFERENCES `ItemPocket`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ItemFlingEffect` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `ItemPocket` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `Move` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`generation_id` integer,
	`type_id` integer,
	`power` integer,
	`pp` integer,
	`accuracy` integer,
	`priority` integer,
	`target_id` integer,
	`damage_class_id` integer,
	`effect_id` integer,
	`effect_chance` integer,
	`contest_type_id` integer,
	`contest_effect_id` integer,
	`super_contest_effect_id` integer,
	FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type_id`) REFERENCES `Type`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`target_id`) REFERENCES `MoveTarget`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`damage_class_id`) REFERENCES `MoveDamageClass`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`effect_id`) REFERENCES `MoveEffect`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contest_type_id`) REFERENCES `ContestType`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`contest_effect_id`) REFERENCES `ContextEffect`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`super_contest_effect_id`) REFERENCES `SuperContextEffect`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `MoveDamageClass` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `MoveEffect` (
	`id` integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `MoveTarget` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `Pokemon` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`species_id` integer,
	`height` integer,
	`weight` integer,
	`base_experience` integer,
	`order` integer,
	`is_default` integer,
	FOREIGN KEY (`species_id`) REFERENCES `PokemonSpecies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonAbility` (
	`pokemon_id` integer,
	`ability_id` integer,
	`is_hidden` integer,
	`slot` integer,
	PRIMARY KEY(`pokemon_id`, `ability_id`, `slot`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ability_id`) REFERENCES `Ability`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonColor` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `PokemonForm` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`form_identifier` text,
	`pokemon_id` integer,
	`introduced_in_version_group_id` integer,
	`is_default` integer,
	`is_battle_only` integer,
	`is_mega` integer,
	`form_order` integer,
	`order` integer,
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`introduced_in_version_group_id`) REFERENCES `VersionGroup`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonGameIndex` (
	`pokemon_id` integer,
	`version_id` integer,
	`game_index` integer,
	PRIMARY KEY(`pokemon_id`, `version_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`version_id`) REFERENCES `Version`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonHabitat` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `PokemonItem` (
	`pokemon_id` integer,
	`version_id` integer,
	`item_id` integer,
	`rarity` integer,
	PRIMARY KEY(`pokemon_id`, `version_id`, `item_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`version_id`) REFERENCES `Version`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonMove` (
	`pokemon_id` integer,
	`version_group_id` integer,
	`move_id` integer,
	`pokemon_move_method_id` integer,
	`level` integer,
	`order` integer,
	PRIMARY KEY(`pokemon_id`, `version_group_id`, `move_id`, `pokemon_move_method_id`, `level`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`version_group_id`) REFERENCES `VersionGroup`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`move_id`) REFERENCES `Move`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pokemon_move_method_id`) REFERENCES `PokemonMoveMethod`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonMoveMethod` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `PokemonShape` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `PokemonSpecies` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`generation_id` integer,
	`evolves_from_species_id` integer,
	`evolution_chain_id` integer,
	`color_id` integer,
	`shape_id` integer,
	`habitat_id` integer,
	`gender_rate` integer,
	`capture_rate` integer,
	`base_happiness` integer,
	`is_baby` integer,
	`hatch_counter` integer,
	`has_gender_differences` integer,
	`growth_rate_id` integer,
	`forms_switchable` integer,
	`is_legendary` integer,
	`is_mythical` integer,
	`order` integer,
	`conquest_order` integer,
	FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`evolves_from_species_id`) REFERENCES `PokemonSpecies`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`evolution_chain_id`) REFERENCES `EvolutionChain`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`color_id`) REFERENCES `PokemonColor`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shape_id`) REFERENCES `PokemonShape`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`habitat_id`) REFERENCES `PokemonHabitat`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`growth_rate_id`) REFERENCES `GrowthRate`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonStat` (
	`pokemon_id` integer,
	`stat_id` integer,
	`base_stat` integer,
	`effort` integer,
	PRIMARY KEY(`pokemon_id`, `stat_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`stat_id`) REFERENCES `Stat`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PokemonType` (
	`pokemon_id` integer,
	`type_id` integer,
	`slot` integer,
	PRIMARY KEY(`pokemon_id`, `type_id`),
	FOREIGN KEY (`pokemon_id`) REFERENCES `Pokemon`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`type_id`) REFERENCES `Type`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Region` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text
);
--> statement-breakpoint
CREATE TABLE `Stat` (
	`id` integer,
	`identifier` text,
	`is_battle_only` integer,
	`game_index` integer,
	FOREIGN KEY (`id`) REFERENCES `MoveDamageClass`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `SuperContextEffect` (
	`id` integer PRIMARY KEY NOT NULL,
	`appeal` integer
);
--> statement-breakpoint
CREATE TABLE `Type` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`generation_id` integer,
	`damage_class_id` integer,
	FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`damage_class_id`) REFERENCES `MoveDamageClass`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Version` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`version_group_id` integer,
	FOREIGN KEY (`version_group_id`) REFERENCES `VersionGroup`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `VersionGroup` (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text,
	`generation_id` integer,
	`order` integer,
	FOREIGN KEY (`generation_id`) REFERENCES `Generation`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `Ability_index` ON `Ability` (`generation_id`);--> statement-breakpoint
CREATE INDEX `EvolutionChain_index` ON `EvolutionChain` (`baby_trigger_item_id`);--> statement-breakpoint
CREATE INDEX `Generation_index` ON `Generation` (`main_region_id`);--> statement-breakpoint
CREATE INDEX `Item_index` ON `Item` (`category_id`,`fling_effect_id`);--> statement-breakpoint
CREATE INDEX `ItemCategory_index` ON `ItemCategory` (`pocket_id`);--> statement-breakpoint
CREATE INDEX `Move_index` ON `Move` (`generation_id`,`type_id`,`target_id`,`damage_class_id`,`effect_id`,`contest_type_id`,`contest_effect_id`,`super_contest_effect_id`);--> statement-breakpoint
CREATE INDEX `Pokemon_index` ON `Pokemon` (`species_id`);--> statement-breakpoint
CREATE INDEX `PokemonForm_index` ON `PokemonForm` (`pokemon_id`,`introduced_in_version_group_id`);--> statement-breakpoint
CREATE INDEX `PokemonSpecies_index` ON `PokemonSpecies` (`generation_id`,`evolves_from_species_id`,`evolution_chain_id`,`color_id`,`shape_id`,`habitat_id`,`growth_rate_id`);--> statement-breakpoint
CREATE INDEX `Stat_index` ON `Stat` (`id`);--> statement-breakpoint
CREATE INDEX `Type_index` ON `Type` (`generation_id`,`damage_class_id`);--> statement-breakpoint
CREATE INDEX `Version_index` ON `Version` (`version_group_id`);--> statement-breakpoint
CREATE INDEX `VersionGroup_index` ON `VersionGroup` (`generation_id`);