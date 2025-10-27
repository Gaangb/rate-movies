import { useEffect, useMemo, useRef, useState } from "react"
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import { useNavigate, useSearchParams } from "react-router-dom"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import apiMovies from "../../api/api"
import MovieCard from "../../components/movie-card/MovieCard"

const tmdbImg = (path, size = "w1280") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null

const yearOf = (s) => s?.slice(0, 4) || ""

function HomePage() {
  const [movies, setMovies] = useState([])
  const [movieIds, setMovieIds] = useState(new Set())
  const [favorites, setFavorites] = useState(() => new Set())
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const query = params.get("q") || ""

  const pendingFav = useRef(new Set())
  const loaderRef = useRef(null)
  const loadingRef = useRef(false)

  const toggleFavorite = (movie) => {
    const willFavorite = !favorites.has(movie.id);

    if (pendingFav.current.has(movie.id)) return;
    pendingFav.current.add(movie.id);

    setFavorites((prev) => {
      const next = new Set(prev);
      if (willFavorite) next.add(movie.id);
      else next.delete(movie.id);
      return next;
    });

    handleFavoriteApi(movie, willFavorite)
      .catch(() => {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (willFavorite) next.delete(movie.id);
          else next.add(movie.id);
          return next;
        });
      })
      .finally(() => {
        pendingFav.current.delete(movie.id);
      });
  };

  // agora aceita (pageNum, q) e escolhe discover ou search
  const fetchMovies = async (pageNum = 1, q = query) => {
    if (loadingRef.current) return
    loadingRef.current = true
    setLoading(true)

    try {
      const base = q
        ? `movies/search/?query=${encodeURIComponent(q)}`
        : `discover/?`
      const url = `${base}&page=${pageNum}&account_id=${import.meta.env.VITE_API_ACCOUNT_ID}&language=pt-BR`

      const response = await apiMovies.get(url)
      const newMovies = response.data.results || []

      if (newMovies.length === 0) {
        setHasMore(false)
      } else {
        setMovies((prev) => {
          const filtered = newMovies.filter((m) => !movieIds.has(m.id))
          const updatedIds = new Set([...movieIds, ...filtered.map((m) => m.id)])
          setMovieIds(updatedIds)

          setFavorites((prevFavs) => {
            const updatedFavs = new Set(prevFavs)
            filtered.forEach((m) => {
              if (m.favorite) updatedFavs.add(m.id)
            })
            return updatedFavs
          })

          return [...prev, ...filtered]
        })
      }
    } catch (error) {
      console.error("Erro ao buscar filmes:", error)
    } finally {
      loadingRef.current = false
      setLoading(false)
    }
  }

  // quando a query muda, reseta lista/ids/favoritos e busca página 1
  useEffect(() => {
    setMovies([])
    setMovieIds(new Set())
    setFavorites(new Set())
    setHasMore(true)
    setPage(1)
    fetchMovies(1, query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // paginação
  useEffect(() => {
    if (page > 1) fetchMovies(page, query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query])

  // observer do loader
  useEffect(() => {
    if (loading || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && !loadingRef.current) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)

    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
      observer.disconnect()
    }
  }, [loading, hasMore, query])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setShowScrollTop(scrollY > 600)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFavoriteApi = async (movie, isFav) => {
    try {
      const payload = {
        account_id: import.meta.env.VITE_API_ACCOUNT_ID,
        favorite: isFav,
        media_type: "movie",
        movie_id: movie.id,
      };

      await apiMovies.post("/favorites/", payload)
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error)
    }
  }

  const featured = useMemo(() => {
    // esconde o destaque quando estiver em modo de busca
    if (query || !movies?.length) return null
    return movies.reduce(
      (acc, cur) =>
        (cur.popularity ?? 0) > (acc?.popularity ?? -1) ? cur : acc,
      movies[0]
    )
  }, [movies, query])

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
              bgcolor: "transparent",
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
        <Typography variant="h6">
          {query ? `Resultados para "${query}"` : "Filmes"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movies?.length || 0} resultados
        </Typography>
      </Box>

      <Grid container spacing={2} p={{ xs: 2, md: 0 }}>
        {movies.length ? (
          movies.map((movie, index) => (
            <Grid
              key={`${movie.id}-${index}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
            >
              <MovieCard
                movie={movie}
                isFavorite={favorites.has(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))
        ) : (
          <Typography sx={{ p: 2 }}>
            {query ? "Nenhum filme encontrado para sua busca." : "Nenhum filme encontrado"}
          </Typography>
        )}
      </Grid>

      {hasMore && !loading && (
        <div
          ref={loaderRef}
          style={{ height: "60px", margin: "40px 0", textAlign: "center" }}
        >
          <Typography color="text.secondary">Carregando mais...</Typography>
        </div>
      )}

      {loading && (
        <Typography
          sx={{ textAlign: "center", py: 2 }}
          color="text.secondary"
        >
          Carregando filmes...
        </Typography>
      )}

      {!hasMore && (
        <Typography
          sx={{ textAlign: "center", py: 2 }}
          color="text.secondary"
        >
          Você chegou ao fim da lista 🍿
        </Typography>
      )}

      {showScrollTop && (
        <Box
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={scrollToTop}
            sx={{
              borderRadius: "50%",
              minWidth: 0,
              width: 48,
              height: 48,
              boxShadow: 4,
            }}
          >
            <KeyboardArrowUpIcon />
          </Button>
        </Box>
      )}
    </Container>
  )
}

export default HomePage
