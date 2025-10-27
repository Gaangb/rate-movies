import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Chip, Button } from '@mui/material'
import MovieCard from '../../components/movie-card/MovieCard'
import LoadingOrEmptyState from '../../components/loading-or-empty-state/LoadingOrEmptyState'
import apiMovies from '../../api/api'
import { useSnackbar } from 'notistack'

function SharedListPage() {
  const { slug } = useParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    const fetchSharedList = async () => {
      try {
        setLoading(true)
        setError(false)

        const { data } = await apiMovies.get('/get-shared-favorites/', {
          params: { list_name: slug },
        })

        setMovies(data || [])
      } catch (err) {
        enqueueSnackbar(`Erro ao buscar lista compartilhada ${err}`, {
          variant: 'error',
        })
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchSharedList()
  }, [slug])

  return (
    <LoadingOrEmptyState
      loading={loading}
      hasItems={movies.length > 0 && !error}
      loadingMessage="Carregando lista compartilhada..."
      emptyMessage={
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {error ? 'Erro ao carregar lista 😢' : 'Lista não encontrada 😢'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {error
              ? 'Ocorreu um problema ao buscar os filmes. Tente novamente mais tarde.'
              : 'O link pode estar incorreto ou a lista foi removida.'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.history.back()}
          >
            Voltar
          </Button>
        </Box>
      }
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Lista: {slug}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movies.length} filme{movies.length !== 1 && 's'} encontrados
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="Lista compartilhada"
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>

        <Grid container spacing={2} p={{ xs: 2, md: 0 }}>
          {movies.map((movie, index) => (
            <Grid
              key={`${movie.movie_id}-${index}`}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
            >
              <MovieCard
                movie={{
                  id: movie.movie_id,
                  title: movie.title,
                  original_title: movie.original_title,
                  overview: movie.overview,
                  poster_path: movie.poster_path,
                  release_date: movie.release_date,
                  vote_average: movie.vote_average,
                }}
                showFavoriteButton={false}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </LoadingOrEmptyState>
  )
}

export default SharedListPage
