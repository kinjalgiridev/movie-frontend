import React from 'react';
import styles from './movie-card.module.css'
const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <p>{movie.name}</p>
      <p>{movie.year}</p>
    </div>
  );
};

export default MovieCard;
