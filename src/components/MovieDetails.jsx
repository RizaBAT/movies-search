import React, { useState, useEffect } from "react";
import axios from "axios";
import "./movieDetails.css";
import { useParams } from "react-router-dom";

export default function MovieDetails() {
  const { id } = useParams();
  const [movieDetailsData, setMovieDetailsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const apiKey = "22ad44ca2f3f0a6744e8069536f08f8c";
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
        );
        const data = response.data;
        console.log(data);
        setMovieDetailsData(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (!movieDetailsData) return <div>Loading...</div>;

  return (
    <div className="movie-details-container">
      <img
        src={`https://image.tmdb.org/t/p/w300/${movieDetailsData.poster_path}`}
        alt={movieDetailsData.title}
        className="movie-poster"
      />
      <div className="movie-details">
        <h2 className="movie-title">{movieDetailsData.title}</h2>
        <p className="movie-overview">{movieDetailsData.overview}</p>
        <p className="movie-release-date">
          Release Date: {movieDetailsData.release_date}
        </p>
        <p className="movie-rating">Rating: {movieDetailsData.vote_average}</p>
      </div>
    </div>
  );
}
