import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/.netlify/functions/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Movies List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              {movie.title} {movie.year ? `(${movie.year})` : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
