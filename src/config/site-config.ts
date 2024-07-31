export type SideBarItem = {
  label: string;
  link?: string;
  items?: SideBarItem[];
};

export const sideBarConfig: SideBarItem[] = [
  {
    label: "Pokémon",
    items: [
      {
        label: "Pokemons",
        link: "/pokemons/list/1",
      },
      {
        label: "Pokemons 2",
        link: "/pokemons/list/2",
      },
      {
        label: "Pokemons",
        link: "/",
      },
    ],
  },
];
