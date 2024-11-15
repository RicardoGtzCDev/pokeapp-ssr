(async () => {
  const fs = require('fs');

  const TOTAL_POKEMONS = 5;
  const TOTAL_PAGES = 5;

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pagesIds = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

  const pokemonsById = pokemonIds.map((pokemonId) => `/pokemons/${pokemonId}`);
  const pokemonsByName = (
    await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
      .then((response) => response.json())
  ).results.map((result) => `/pokemons/${result.name}`);

  const pages = pagesIds.map((pageId) => `/pokemons/page/${pageId}`);
  const fileContent = [...pokemonsById, ...pokemonsByName, ...pages].join('\n');


  fs.writeFileSync('routes.txt', fileContent)
})()

