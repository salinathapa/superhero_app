import React, { useState, useEffect } from 'react';

const HoennPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchHoennPokemon() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251');
      const data = await response.json();
      const results = data.results;

      const pokemonDetails = [];

      for (const pokemon of results) {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        pokemonDetails.push({
          name: pokemonData.name,
          iconUrl: pokemonData.sprites.front_default,
        });
      }

      setPokemonList(pokemonDetails);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching Hoenn Pokémon:', error);
    }
  }

  useEffect(() => {
    fetchHoennPokemon();
  }, []);

  if (isLoading) {
    return <div>Loading Pokémon...</div>;
  }

  return (
    <div>
      <h2>Hoenn Pokémon</h2>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img src={pokemon.iconUrl} alt={`Icon of ${pokemon.name}`} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoennPage;
