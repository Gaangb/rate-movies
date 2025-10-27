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
} from '@mui/material'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import { useEffect, useState } from 'react'
import MovieCard from '../../components/movie-card/MovieCard'
import apiMovies from '../../api/api'

function FavoritesPage() {
  const [movies, setMovies] = useState([])
  const [favorites, setFavorites] = useState(() => new Set())
  const [openDialog, setOpenDialog] = useState(false)
  const [listName, setListName] = useState('')
  const [nameError, setNameError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sharing, setSharing] = useState(false)

  const accountId = import.meta.env.VITE_API_ACCOUNT_ID

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true)
        const { data } = await apiMovies.get('/favorites/', {
          params: { account_id: accountId },
        })
        const results = data?.results ?? []
        console.log(data?.list_name)
        setMovies(results)
        setFavorites(new Set(results.map((m) => m.id)))
      } catch (error) {
        console.error('Erro ao buscar filmes favoritos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFavorites()
  }, [accountId])

  const toggleFavorite = async (movie) => {
    try {
      const isFav = favorites.has(movie.id)

      await apiMovies.post('/favorites/', {
        account_id: accountId,
        movie_id: movie.id,
        favorite: !isFav,
        media_type: 'movie',
      })

      setFavorites((prev) => {
        const next = new Set(prev)
        if (isFav) next.delete(movie.id)
        else next.add(movie.id)
        return next
      })

      if (isFav) setMovies((prev) => prev.filter((m) => m.id !== movie.id))
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error)
    }
  }

  const handleOpenShare = () => setOpenDialog(true)
  const handleCloseShare = () => {
    setOpenDialog(false)
    setListName('')
    setNameError('')
  }

  const onNameChange = (e) => {
    const value = e.target.value
    setListName(value)
    if (/\s/.test(value)) {
      setNameError('Use apenas letras/números/-, sem espaços.')
    } else if (!value.trim()) {
      setNameError('Informe um nome.')
    } else {
      setNameError('')
    }
  }

  const handleShare = async () => {
    const movieIds = movies.filter((m) => favorites.has(m.id)).map((m) => m.id)

    if (!movieIds.length) {
      alert('Você não possui filmes favoritados para compartilhar.')
      return
    }
    if (nameError || !listName.trim()) return

    const sanitized = listName.trim().replace(/\s+/g, '-')

    try {
      setSharing(true)
      const { data } = await apiMovies.post('/share-list/', {
        account_id: Number(accountId),
        list_name: sanitized,
        movie_ids: movieIds,
      })

      const slug = data?.slug || accountId
      const shareUrl = `${window.location.origin}/list/${slug}`

      if (navigator.share) {
        await navigator.share({
          title: `Lista "${sanitized}" - RateMovies`,
          text: 'Confira minha lista de filmes favoritos!',
          url: shareUrl,
        })
      } else {
        await navigator.clipboard.writeText(shareUrl)
        alert(`Link copiado!\n${shareUrl}`)
      }

      handleCloseShare()
    } catch (err) {
      console.error('Erro ao criar lista compartilhável:', err)
      alert('Não foi possível gerar a lista. Tente novamente.')
    } finally {
      setSharing(false)
    }
  }

  const isNameValid = !!listName.trim() && !/\s/.test(listName)

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          mb: 0.5,
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Favoritos
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movies?.length || 0} resultado{movies?.length > 1 ? 's' : ''}
        </Typography>
      </Box>

      <Box
        sx={{
          mb: 2.5,
          px: { xs: 2, md: 0 },
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ShareRoundedIcon />}
          onClick={handleOpenShare}
          disabled={!movies.length}
        >
          Compartilhar lista
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseShare}>
        <DialogTitle>Compartilhar lista</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Dê um nome para sua lista (sem espaços):
          </Typography>
          <TextField
            autoFocus
            fullWidth
            label="Nome da lista"
            variant="outlined"
            value={listName}
            onChange={onNameChange}
            error={!!nameError}
            helperText={nameError || 'Ex.: favoritos_2025 ou filmes-top'}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseShare} disabled={sharing}>
            Cancelar
          </Button>
          <Button
            onClick={handleShare}
            variant="contained"
            disabled={!isNameValid || sharing}
          >
            {sharing ? 'Gerando...' : 'Compartilhar'}
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Carregando favoritos...
          </Typography>
        </Box>
      ) : movies.length > 0 ? (
        <Grid container spacing={2} p={{ xs: 2, md: 0 }}>
          {movies.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <MovieCard
                movie={movie}
                isFavorite={favorites.has(movie.id)}
                onToggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '50vh' }}>
          <Typography color="text.secondary">
            Nenhum filme favoritado ainda 😢
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default FavoritesPage
