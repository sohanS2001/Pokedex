import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Style/SearchPage.css';
import pokemonImage from './pokemon-image.jpeg';

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    // Fetch search suggestions from API or pre-defined list
    // You can replace the placeholder fetchSuggestions function with your own implementation
    fetchSuggestions();
  }, []);

  const fetchSuggestions = () => {
    // Fetch suggestions from API or use a pre-defined list
    const suggestionList = ['Pikachu', 'Charizard', 'Eevee', 'Gengar', 'Mewtwo'];
    setSuggestions(suggestionList);
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const pokemonList = response.data.results;
      const filteredResults = pokemonList.filter((pokemon) =>
        pokemon.name.includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
      setLoading(false);
      setTotalResults(filteredResults.length);
      setCurrentPage(1);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  return (
    <div className="container">
      <h2 className="title">Pokémon Search</h2>
      <p className="description">Search for your favorite Pokémon</p>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter Pokémon name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion) => (
            <li key={suggestion} className="suggestion-item" onClick={() => setSearchTerm(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {currentResults.length > 0 && (
        <ul className="results">
          {currentResults.map((pokemon) => (
            <li className="result-item" key={pokemon.name}>
              <Link className="result-link" to={`/details/${pokemon.name}`}>
                {pokemon.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {currentResults.length > 0 && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(totalResults / resultsPerPage) }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
              onClick={() => handlePagination(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      )}
      <img className="pokemon-image" src={pokemonImage} alt="Pokémon" />
    </div>
  );
};

export default SearchPage;
