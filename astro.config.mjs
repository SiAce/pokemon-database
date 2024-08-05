import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig, passthroughImageService } from "astro/config";

// https://astro.build/config
export default defineConfig({
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      title: "Pokémon Database",
      social: {
        github: "https://github.com/withastro/starlight",
      },
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
          ],
        },
        {
          label: "Type",
          items: [
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
        "./src/tailwind.css",
      ],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
