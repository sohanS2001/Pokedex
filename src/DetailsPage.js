import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Style/DetailsPage.css';

const DetailsPage = () => {
  const { pokemonId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemonDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]);

  useEffect(() => {
    if (pokemonDetails) {
      const getPokemonImageUrl = () => {
        const pokemonIdFormatted = String(pokemonDetails.id).padStart(3, '0');
        const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonIdFormatted}.png`;
        setImageUrl(imageUrl);
      };

      getPokemonImageUrl();
    }
  }, [pokemonDetails]);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!pokemonDetails) {
    return null;
  }

  return (
    <div className="container">
      <div className="details">
        <h2>{pokemonDetails.name}</h2>
        {/* <button onClick={handleBookmark}>{bookmarked ? 'Remove Bookmark' : 'Bookmark'}</button> */}
        <Link to="/">
          <button>Go Back</button>
        </Link>
        {imageUrl && <img src={imageUrl} alt={pokemonDetails.name} className="pokemon-image" />}
        <p>Height: {pokemonDetails.height}</p>
        <p>Weight: {pokemonDetails.weight}</p>
        <p>Base Experience: {pokemonDetails.base_experience}</p>
        <p>Abilities:</p>
        <ul>
          {pokemonDetails.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>
        <p>Types:</p>
        <ul>
          {pokemonDetails.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>
        <p>Stats:</p>
        <ul>
          {pokemonDetails.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;
