import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useMovies } from "../../hooks/useMovies";
import MovieCard from "../../components/movie-card/movieCard";

const tmdbImg = (path, size = "w1280") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}`: null

const yearOf = (s) => s?.slice(0, 4) || "";

function HomePage() {
  const { movies } = useMovies();
  const [favorites, setFavorites] = useState(() => new Set());
  const navigate = useNavigate();

  const toggleFavorite = (m) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(m.id) ? next.delete(m.id) : next.add(m.id);
      return next;
    });
  };

  const featured = useMemo(() => {
    if (!movies?.length) return null;
    return movies.reduce(
      (acc, cur) => ((cur.popularity ?? 0) > (acc?.popularity ?? -1) ? cur : acc),
      movies[0]
    );
  }, [movies]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {featured && (
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            minHeight: { xs: 260, sm: 320, md: 380 },
            mb: 3,
            boxShadow: 3,
            color: "common.white",
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${tmdbImg(featured.backdrop_path)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: "scale(1.06)",
              backgroundRepeat: "no-repeat",
              bgcolor: "transparent"
            }}
          />
          <Box
            aria-hidden
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(90deg, rgba(0,0,0,.70) 0%, rgba(0,0,0,.45) 45%, rgba(0,0,0,0) 100%)",
            }}
          />
          <Box sx={{ position: "relative", p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography variant="h5" fontWeight={700}>
              {featured.title || featured.originalTitle}
              {featured.releaseDate && (
                <Typography component="span" sx={{ ml: 1, opacity: 0.85 }}>
                  ({yearOf(featured.releaseDate)})
                </Typography>
              )}
            </Typography>

            {featured.genres?.length ? (
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {featured.genres.slice(0, 4).map((g) => (
                  <Chip
                    key={g.id ?? g.name}
                    size="small"
                    label={g.name}
                    variant="outlined"
                    sx={{ color: "#fff", borderColor: "rgba(255,255,255,.35)" }}
                  />
                ))}
              </Box>
            ) : null}

            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 900,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                pr: { md: 10 },
              }}
            >
              {featured.overview}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/movie/${featured.id}`)}
              >
                Ver detalhes
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 1.5,
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6">Filmes</Typography>
        <Typography variant="body2" color="text.secondary">
          {movies?.length || 0} resultados
        </Typography>
      </Box>
      
      <Grid container spacing={2} p={{ xs: 2, md: 0 }}>
        {movies ? (
          movies.map((movie) => (
            <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
              <MovieCard
                movie={movie}
                isFavorite={favorites.has(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))
        ) : (
          <Typography sx={{ p: 2 }}>Nenhum filme encontrado</Typography>
        )}
      </Grid>
    </Container>
  );
}

export default HomePage;
