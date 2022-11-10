import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import noImg from "../assests/404.svg";
import { useNavigate } from "react-router-dom";

export default function MovieCards({ movie }) {
  const navigate = useNavigate();
  const image_url = `https://image.tmdb.org/t/p/w500`;

  return (
    <Card className="cards" onClick={() => navigate(`/details/${movie.id}`)}>
      <CardMedia
        component="img"
        image={
          !image_url + movie?.poster_path
            ? image_url + movie?.poster_path
            : noImg
        }
        alt={movie.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography
          className="card-desc"
          variant="body2"
          color="text.secondary"
        >
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
}
