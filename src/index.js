import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchPage from './SearchPage';
import ListingPage from './ListingPage';
import DetailsPage from './DetailsPage';
import BookmarksScreen from './BookmarksScreen';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/list" element={<ListingPage />} />
      <Route path="/details/:pokemonId" element={<DetailsPage />} />
      <Route path="/bookmarks" element={<BookmarksScreen />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
