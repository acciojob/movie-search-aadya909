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
      .then((res) => res.json())
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

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovies();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Search Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search movie title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {movies.map((movie) => (
          <li key={movie.imdbID} style={{ margin: '10px' }}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}
              alt={movie.Title}
              style={{ width: '150px', borderRadius: '8px' }}
            />
            <h4>{movie.Title}</h4>
            <p>({movie.Year})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieSearch;
