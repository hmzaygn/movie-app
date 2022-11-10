import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../componets/VideoSection";

const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState("");
  const [videoKey, setVideoKey] = useState();
  const { id } = useParams();

  const {
    title,
    poster_path,
    overview,
    vote_average,
    vote_count,
    release_date,
  } = movieDetails;

  const apiKey = process.env.REACT_APP_TMDB_APIKEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

  useEffect(() => {
    fetch(movieDetailBaseUrl)
      .then((res) => res.json())
      .then((data) => setMovieDetails(data));

    fetch(videoUrl)
      .then((res) => res.json())
      .then((data) => setVideoKey(data));
  }, [movieDetailBaseUrl, videoUrl]);

  return (
    <Box align="center">
      <Typography variant="h2" align="center">
        {title}
      </Typography>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <Box className="details">
        <img
          src={poster_path ? baseImageUrl + poster_path : defaultImage}
          alt={title}
        />

        <Box className="overview">
          <Box className="description">
            <Typography variant="h5">Overview</Typography>
            <Typography>{overview}</Typography>
          </Box>
          <Box className="overview-list">
            <List>
              <ListItemText primary={"Release Date : " + release_date} />
              <ListItemText primary={"Rate : " + vote_average} />
              <ListItemText primary={"Total Vote : " + vote_count} />
              <Link className="button" to={-1}>
                Go Back
              </Link>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
