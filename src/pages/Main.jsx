import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../auth/firebase";
import { useAuthContext } from "../context/AuthProvider";
import MovieCards from "../componets/MovieCards";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const apiKey = process.env.REACT_APP_TMDB_APIKEY;
  const { setUser, user } = useAuthContext();
  const [movies, setMovies] = useState({});
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieName}`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (user) {
      fetch(searchUrl)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          return res.json();
        })
        .then((data) => setMovies(data.results))
        .catch((error) => console.log(error));
    } else {
      alert("Please LogIn");
      navigate("/login");
    }
    setMovieName("");
  };

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => setMovies(data.results))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          width: "100vw",
          background: "lightgray",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <TextField
          sx={{ width: "20rem" }}
          id="search-movie"
          label="Search a movie"
          variant="outlined"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <Button
          type="submit"
          sx={{ width: "20rem" }}
          variant="contained"
          size="large"
        >
          Search
        </Button>
      </Box>
      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {movies.length > 0 &&
          movies.map((movie, index) => (
            <MovieCards key={index} movie={movie} />
          ))}
      </Box>
    </Box>
  );
};

export default Main;
