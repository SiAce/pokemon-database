import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Pokémon Database',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Pokémon',
					items: [
						{ label: 'Pokemons', link: '/pokemons/pokemon' }
					]
				},
			],
		}),
	],
});
