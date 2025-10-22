import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import noPoster from '../../assets/Image-not-found.png'
import { useNavigate } from 'react-router-dom';

export default function MovieCard({movie}) {
  const navigate = useNavigate()
  const tmdbImg = (path, size = "w300_and_h450") =>
        path ? `https://image.tmdb.org/t/p/${size}_bestv2/${path}` : `${noPoster}`;
  //TODO falta adicionar o coração de favoritar
  function onCardClick() {
    navigate(`movie/${movie.id}`)
  }

  return (
    <Card sx={{ maxWidth: 345 }} onClick={onCardClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={tmdbImg(movie.posterPath)}
          alt={movie.originalTitle ? movie.originalTitle : "no movie originalTitle"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {movie.originalTitle ? movie.originalTitle : ''}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {movie.overview ? movie.overview : ''}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}