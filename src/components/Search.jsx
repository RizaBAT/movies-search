import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.css";
import { Link } from "react-router-dom";

export default function Search() {
  const [movie, setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getMovieData(searchTerm) {
    setLoading(true);
    setError(null);

    try {
      const apiKey = "22ad44ca2f3f0a6744e8069536f08f8c";
      let resp = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );
      setMovie(resp.data.results);
    } catch (e) {
      setError("Error fetching movie data.");
    }

    setLoading(false);
  }

  const handleSearch = async () => {
    if (searchTerm.trim() !== "") {
      await getMovieData(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    getMovieData("popular");
  }, []);

  return (
    <div className="background_container">
      <div className="search_container">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="flex-container">
        {movie.map((item) => (
          <Link to={`/movieDetails/${item.id}`} key={item.id} className="movie_item">
            <img
              src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
              alt={item.original_title || item.original_name}
            />
            <div className="movie_name">
              {item.original_title ? item.original_title : item.original_name}
            </div>
            <div>{item.release_date}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
