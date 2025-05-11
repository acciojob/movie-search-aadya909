import React, { useState } from 'react';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');

  const fetchMovies = () => {
    if (!query.trim()) {
      setError('Please enter a movie name.');
      setMovies([]);
      return;
    }

    const API_KEY = '99eb9fd1';
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === 'True') {
          setMovies(data.Search);
          setError('');
        } else {
          setError('Invalid movie name. Please try again.');
          setMovies([]);
        }
      })
      .catch(() => {
        setError('Something went wrong. Please try again later.');
        setMovies([]);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchMovies();
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Search Movie</h2>
      <input
        type="text"
        placeholder="Search movie title..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={fetchMovies}>Search</button>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.imdbID} style={{ margin: '10px', width: '180px' }}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h4>{movie.Title}</h4>
            <p>({movie.Year})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
