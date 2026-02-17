import starlight from "@astrojs/starlight";
import { defineConfig, passthroughImageService } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },

  integrations: [
    starlight({
      title: "Pokémon Database",
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/SiAce/pokemon-database' },
      ],
      sidebar: [
        {
          label: "Pokémon",
          items: [
            {
              label: "Pokemons",
              link: "/pokemons/list/1",
            },
            {
              label: "Pokemon By Generation",
              link: "/pokemons/by-generation",
            },
            {
              label: "Pokemon By Type",
              link: "/pokemons/by-type",
            },
          ],
        },
        {
          label: "Type",
          items: [
            {
              label: "Types",
              link: "/types/type",
            },
            {
              label: "Type Chart",
              link: "/types/chart",
            },
          ],
        },
      ],
      logo: {
        src: "./src/assets/pokemon-logo.svg",
      },
      favicon: "/images/favicon.ico",
      customCss: [
        // Path to your Tailwind base styles:
        './src/styles/global.css',
      ],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});