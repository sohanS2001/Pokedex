import React, { useState, useEffect } from 'react';

const BookmarksScreen = () => {
  const [bookmarkedPokemons, setBookmarkedPokemons] = useState([]);

  useEffect(() => {
    const storedPokemons = localStorage.getItem('bookmarkedPokemons');
    if (storedPokemons) {
      setBookmarkedPokemons(JSON.parse(storedPokemons));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarkedPokemons', JSON.stringify(bookmarkedPokemons));
  }, [bookmarkedPokemons]);

  const removeBookmark = (pokemonName) => {
    setBookmarkedPokemons((prevPokemons) =>
      prevPokemons.filter((pokemon) => pokemon.name !== pokemonName)
    );
  };

  if (bookmarkedPokemons.length === 0) {
    return <p>No bookmarked Pokemon found.</p>;
  }

  return (
    <div>
      <h2>Bookmarked Pokemon</h2>
      <ul>
        {bookmarkedPokemons.map((pokemon) => (
          <li key={pokemon.name}>
            {pokemon.name}
            <button onClick={() => removeBookmark(pokemon.name)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookmarksScreen;
