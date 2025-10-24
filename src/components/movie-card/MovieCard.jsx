import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import noPoster from '../../assets/Image-not-found.png'
import { useNavigate } from 'react-router-dom';
import { Chip, IconButton, Skeleton, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useState } from 'react';

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite, showFavoriteButton = true }) {
  const navigate = useNavigate()
  const tmdbImg = (path, size = "w300_and_h450") =>
    path ? `https://image.tmdb.org/t/p/${size}_bestv2/${path}` : `${noPoster}`

  const [imgLoaded, setImgLoaded] = useState(false);

  function onCardClick() {
    navigate(`/movie/${movie.id}`)
  }

  function handleFavClick(e) {
    e.stopPropagation()
    onToggleFavorite?.(movie)
  }

  const yearOf = (s) => s?.slice(0, 4) || "—";

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        maxWidth: { sm: 240, md: 260 },
        mx: "auto",
        transition: "transform .15s ease, box-shadow .15s ease",
        "&:hover": { transform: "translateY(-2px)", boxShadow: 6 },
      }}
    >
      <CardActionArea
        onClick={onCardClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          height: "100%",
          "&.Mui-focusVisible": {
            outline: "2px solid rgba(255,255,255,.9)",
            outlineOffset: 2,
            borderRadius: 8,
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {!imgLoaded && (
            <Skeleton
              variant="rectangular"
              sx={{ position: "absolute", inset: 0, borderRadius: 0 }}
              height={0}
            />
          )}

          <CardMedia
            component="img"
            loading="lazy"
            src={tmdbImg(movie.posterPath)}
            sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
            alt={movie.originalTitle || "Sem título"}
            onLoad={() => setImgLoaded(true)}
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              objectFit: "cover",
              display: "block",
            }}
          />

          <Box sx={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 1 }}>
            <Chip
              size="small"
              label={yearOf(movie.releaseDate)}
              sx={{ bgcolor: "rgba(0,0,0,.55)", color: "#fff" }}
            />
            <Chip
              size="small"
              label={(movie.voteAverage ?? 0).toFixed(1)}
              sx={{ bgcolor: "rgba(0,0,0,.55)", color: "#fff" }}
            />
          </Box>
        </Box>

        <CardContent sx={{ width: "100%", p: 1.5 }}>
          <Tooltip title={movie.originalTitle || ""} placement="top" arrow>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              noWrap
              sx={{ mb: 0.5, cursor: "help" }}
            >
              {movie.originalTitle || ""}
            </Typography>
          </Tooltip>

          <Tooltip
            arrow
            placement="bottom-start"
            title={<Box sx={{ whiteSpace: "pre-line" }}>{movie.overview || ""}</Box>}
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
      {showFavoriteButton ?
        <IconButton
          onClick={handleFavClick}
          aria-label="favoritar"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,.35)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,.55)" },
            zIndex: 2,
          }}
        >
          {isFavorite ? <Favorite htmlColor="#ff4d67" /> : <FavoriteBorder />}
        </IconButton>

        : null
      }
    </Card>
  );
}