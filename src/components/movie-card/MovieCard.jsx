import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import noPoster from '../../assets/Image-not-found.png'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Box } from '@mui/system';

export default function MovieCard({ movie }) {
  const navigate = useNavigate()
  const tmdbImg = (path, size = "w300_and_h450") =>
    path ? `https://image.tmdb.org/t/p/${size}_bestv2/${path}` : `${noPoster}`;
  //TODO falta adicionar o coração de favoritar
  function onCardClick() {
    navigate(`movie/${movie.id}`)
  }

  return (
    <Card
      onClick={onCardClick}
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        maxWidth: { sm: 240, md: 260 },
        mx: "auto",
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100%" }}
      >
        <CardMedia
          component="img"
          loading="lazy"
          src={tmdbImg(movie.posterPath)}
          sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
          alt={movie.originalTitle || "Sem título"}
          sx={{
            width: "100%",
            aspectRatio: "2 / 3",
            objectFit: "cover",
            display: "block",
          }}
        />

        <CardContent sx={{ width: "100%", p: 1.5 }}>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{
              mb: 0.5,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {movie.originalTitle || ""}
          </Typography>

          <Tooltip
            arrow
            placement="bottom-start"
            title={
              <Box sx={{ whiteSpace: "pre-line" }}>
                {movie.overview || ""}
              </Box>
            }
            slotProps={{
              tooltip: {
                sx: {
                  maxWidth: 480,
                  p: 1.5,
                  bgcolor: "background.paper",
                  color: "text.primary",
                  boxShadow: 3,
                  borderRadius: 1.5,
                },
              },
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                cursor: "help",
              }}
            >
              {movie.overview || ""}
            </Typography>
          </Tooltip>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}