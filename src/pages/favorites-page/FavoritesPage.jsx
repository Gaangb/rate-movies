import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material"
import ShareRoundedIcon from "@mui/icons-material/ShareRounded"
import { useEffect, useState } from "react"
import MovieCard from "../../components/movie-card/MovieCard"
import apiMovies from "../../api/api"

function FavoritesPage() {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState(() => new Set())
  const [openDialog, setOpenDialog] = useState(false)
  const [listName, setListName] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)
        const accountId = import.meta.env.VITE_API_ACCOUNT_ID
        const response = await apiMovies.get(`/favorites/`, {
          params: { account_id: accountId },
        })

        const results = response.data.results || []
        setMovies(results)

        const favSet = new Set(results.map((m) => m.id))
        setFavorites(favSet)
      } catch (error) {
        console.error("Erro ao buscar filmes favoritos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [])

  const toggleFavorite = async (movie) => {
    try {
      const accountId = import.meta.env.VITE_API_ACCOUNT_ID
      const isFav = favorites.has(movie.id)

      await apiMovies.post(`/favorites/`, {
        account_id: accountId,
        movie_id: movie.id,
        favorite: !isFav,
        media_type: "movie",
      })

      setFavorites((prev) => {
        const next = new Set(prev)
        if (isFav) next.delete(movie.id)
        else next.add(movie.id)
        return next
      })

      if (isFav) {
        setMovies((prev) => prev.filter((m) => m.id !== movie.id))
      }
    } catch (error) {
      console.error("Erro ao atualizar favorito:", error)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: `Lista "${listName}" - RateMovies`,
      text: "Confira minha lista de filmes favoritos!",
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
        alert(`Link da lista "${listName}" copiado para a área de transferência!`)
      }
      setOpenDialog(false)
      setListName("")
    } catch (err) {
      console.error("Erro ao compartilhar:", err)
    }
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          mb: 0.5,
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Favoritos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movies?.length || 0} resultado{movies?.length > 1 ? "s" : ""}
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 2.5,
          px: { xs: 2, md: 0 },
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ShareRoundedIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Compartilhar lista
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Compartilhar lista</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Dê um nome para sua lista antes de compartilhar:
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Nome da lista"
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={handleShare}
            variant="contained"
            disabled={!listName.trim()}
          >
            Compartilhar
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Carregando favoritos...
          </Typography>
        </Box>
      ) : movies.length > 0 ? (
        <Grid container spacing={2} p={{ xs: 2, md: 0 }}>
          {movies.map((movie) => (
            <Grid
              key={movie.id}
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
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: "50vh",
          }}
        >
          <Typography color="text.secondary">
            Nenhum filme favoritado ainda 😢
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default FavoritesPage
