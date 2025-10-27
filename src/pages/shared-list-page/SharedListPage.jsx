import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Container, Grid, Typography, Chip, Button } from '@mui/material'
import MovieCard from '../../components/movie-card/MovieCard'
import LoadingOrEmptyState from '../../components/loading-or-empty-state/LoadingOrEmptyState'

// MOCK
const mockLists = {
  'melhores-2024': {
    title: 'Izzana Martins',
    genres: ['Ação', 'Drama', 'Aventura'],
    movies: [
      {
        id: '1',
        title: 'Duna: Parte Dois',
        originalTitle: 'Dune: Part Two',
        overview:
          'Paul Atreides une forças com os Fremen para vingar sua família e salvar Arrakis.',
        posterPath: '/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg',
        voteAverage: 8.6,
      },
      {
        id: '2',
        title: 'Oppenheimer',
        originalTitle: 'Oppenheimer',
        overview:
          'A biografia do físico J. Robert Oppenheimer e seu papel na criação da bomba atômica.',
        posterPath: '/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
        voteAverage: 8.5,
      },
    ],
  },
  teste: {
    title: 'Izzana Barbosa',
    genres: ['Animação', 'Família', 'Fantasia'],
    movies: [
      {
        id: '3',
        title: 'Elementos',
        originalTitle: 'Elemental',
        overview:
          'Ember e Wade vivem em uma cidade onde os habitantes dos quatro elementos convivem.',
        posterPath: '/hj6mDaxW5k7k1fOShv9tF5vNfiO.jpg',
        voteAverage: 7.3,
      },
    ],
  },
}

function SharedListPage() {
  const { slug } = useParams()
  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setList(mockLists[slug] || null)
      setLoading(false)
    }, 600)

    return () => clearTimeout(timer)
  }, [slug])

  return (
    <LoadingOrEmptyState
      loading={loading}
      hasItems={!!list}
      loadingMessage="Carregando lista compartilhada..."
      emptyMessage={
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Lista não encontrada 😢
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            O link pode estar incorreto ou a lista foi removida.
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
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={700}>
            {list?.title}
          </Typography>

          <Box sx={{ mt: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {list?.genres?.map((g) => (
              <Chip key={g} label={g} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Grid container spacing={2}>
          {list?.movies?.map((movie) => (
            <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <MovieCard movie={movie} showFavoriteButton={false} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </LoadingOrEmptyState>
  )
}

export default SharedListPage
