import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    axios.get(`/.netlify/functions/movie?id=${id}`)
      .then(response => setMovieDetail(response.data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [id]);

  if (!movieDetail) return <p>Loading...</p>;

  const { movie, comments } = movieDetail;

  return (
    <div>
      <Link to="/">Back to Movies List</Link>
      <h2>{movie.title} {movie.year ? `(${movie.year})` : ''}</h2>
      {movie.plot && <p>{movie.plot}</p>}
      <h3>Comments</h3>
      {comments.length ? (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>{comment.text || comment.comment}</li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default MovieDetail;
