import React, { useState } from 'react';
import './Common.css';

const Search = ({ onSearch, placeholder = "Search images..." }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        {searchTerm && (
          <button type="button" onClick={handleClear} className="clear-button">
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default Search;