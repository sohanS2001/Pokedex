import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListingPage.css'; // Import the CSS file for styling

const ListingPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
        setPokemons(response.data.results);

        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2 className="title">Pokémon Listing</h2>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <p key={pokemon.name} className="pokemon-name">
            {pokemon.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
