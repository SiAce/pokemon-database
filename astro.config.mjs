import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Pokémon Database',
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Pokémon',
      items: [{
        label: 'Pokemons',
        link: '/pokemons/pokemon'
      }]
    }],
    customCss: [
    // Path to your Tailwind base styles:
    './src/tailwind.css']
  }), tailwind({
    applyBaseStyles: false
  })]
});