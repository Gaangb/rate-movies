// src/pages/MovieDetailsPage.tsx
import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { useParams } from 'react-router-dom'
import noPoster from '../../assets/Image-not-found.png'
import { ActorItem } from '../../components/actor-item/ActorItem'
import { useEffect, useState } from 'react'
import apiMovies from '../../api/api'
import LoadingOrEmptyState from '../../components/loading-or-empty-state/LoadingOrEmptyState'

function MovieDetailsPage() {
  const tmdbImg = (path, size = 'w1280') =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : noPoster

  const [loading, setLoading] = useState(false)
  const [movie, setMovie] = useState(null)

  function ScorePill({ value }) {
    return (
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1.25,
          px: 1.25,
          py: 0.5,
          borderRadius: 999,
          backgroundColor: 'rgba(0,0,0,.35)',
          color: '#fff',
        }}
      >
        <Box sx={{ position: 'relative', width: 36, height: 36 }}>
          <CircularProgress
            variant="determinate"
            value={value}
            size={36}
            thickness={4}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {Math.round(value)}
          </Box>
        </Box>
        <Typography variant="body2">Avaliação</Typography>
      </Box>
    )
  }
  const { id } = useParams()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await apiMovies.get(`movies/${id}`)

        setMovie(response.data)
      } catch (error) {
        console.error('Erro ao buscar filme:', error)
      } finally {
        setLoading(false)
      }
    }
    if (id) {
      fetchMovie()
    }
  }, [id])

  return (
    <LoadingOrEmptyState
      loading={loading}
      hasItems={!!movie}
      loadingMessage="Carregando detalhes do filme..."
      emptyMessage={
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Filme não encontrado ou indisponível 😢
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => window.history.back()}
          >
            Voltar à Home
          </Button>
        </Box>
      }
    >
      <>
        <Box
          component="section"
          sx={{
            position: 'relative',
            width: '100vw',
            left: '50%',
            right: '50%',
            ml: '-50vw',
            mr: '-50vw',
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${tmdbImg(movie?.backdrop_path)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(10px)',
              transform: 'scale(1.06)',
            }}
          />

          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, rgba(0,0,0,.70) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,0) 100%)',
            }}
          />

          <Box
            aria-hidden
            sx={() => ({
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: { xs: 64, sm: 96 },
              background:
                'linear-gradient(to bottom, #0d1115 0%, rgba(0,0,0,0) 100%)',
              pointerEvents: 'none',
            })}
          />

          <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                boxShadow: 3,
                backdropFilter: 'blur(6px)',
                backgroundColor: 'rgba(0,0,0,.25)',
                p: { xs: 2, sm: 3, md: 4 },
                color: 'common.white',
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  rowGap: 2,
                  columnGap: 3,
                  gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
                  gridTemplateAreas: {
                    xs: `"title" "poster" "info"`,
                    sm: `"title  ." "poster info"`,
                  },
                  alignItems: 'start',
                }}
              >
                <Box sx={{ gridArea: 'title' }}>
                  <Typography variant="h5" component="h1" fontWeight="bold">
                    {movie?.title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ mt: 1 }}
                  >
                    {movie?.genres
                      ?.filter((g) => g?.name)
                      .map((g) => (
                        <Chip
                          key={g.id ?? g.name}
                          label={g.name}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: '#fff',
                            borderColor: 'rgba(255,255,255,.35)',
                          }}
                        />
                      ))}
                  </Stack>
                </Box>

                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <ScorePill value={(movie?.vote_average ?? 0) * 10} />
                  <Tooltip
                    title={
                      movie?.videos?.length
                        ? 'Assistir trailer'
                        : 'Trailer indisponível'
                    }
                  >
                    <span>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlayArrowRounded />}
                        disabled={!movie?.videos?.length}
                        onClick={() => {
                          const trailerUrl = movie?.videos?.[0]?.url
                          if (trailerUrl)
                            window.open(
                              trailerUrl,
                              '_blank',
                              'noopener,noreferrer',
                            )
                        }}
                      >
                        REPRODUZIR TRAILER
                      </Button>
                    </span>
                  </Tooltip>
                  <Tooltip title="Adicionar aos favoritos">
                    <IconButton color="inherit" aria-label="favoritar">
                      <FavoriteBorder />
                    </IconButton>
                  </Tooltip>
                </Stack>

                <Card
                  sx={{
                    gridArea: 'poster',
                    width: { xs: 200, sm: 240 },
                    borderRadius: 2,
                    boxShadow: 4,
                    transition: 'transform .2s ease',
                    '&:hover': { transform: 'translateY(-2px)' },
                  }}
                >
                  <CardMedia
                    component="img"
                    src={tmdbImg(movie?.poster_path)}
                    alt={movie?.original_title || movie?.title}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: { xs: 300, sm: 360 },
                      objectFit: 'cover',
                    }}
                  />
                </Card>

                <Box sx={{ gridArea: 'info', minWidth: 0, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', md: 'auto 1fr' },
                      columnGap: 2,
                      rowGap: 1.25,
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography fontWeight="bold">Título original</Typography>
                    <Typography sx={{ overflowWrap: 'anywhere' }}>
                      {movie?.original_title}
                    </Typography>

                    <Typography fontWeight="bold">Lançamento</Typography>
                    <Typography sx={{ overflowWrap: 'anywhere' }}>
                      {movie?.release_date}
                    </Typography>

                    <Typography fontWeight="bold">Idioma original</Typography>
                    <Typography sx={{ overflowWrap: 'anywhere' }}>
                      {movie?.original_language}
                    </Typography>
                  </Box>

                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    Sinopse
                  </Typography>
                  <Typography
                    sx={{
                      maxWidth: 1000,
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,.9)',
                    }}
                  >
                    {movie?.overview}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>

        <Container maxWidth="xl">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Onde assistir
            </Typography>

            {movie?.providers &&
            (movie.providers.flatrate?.length ||
              movie.providers.rent?.length ||
              movie.providers.buy?.length) ? (
              <Grid container spacing={2} sx={{ maxWidth: 820 }}>
                {movie.providers.flatrate?.map((prov) => (
                  <Grid key={prov.provider_id} item xs={12} sm={6} md={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={prov.logo_path}
                        alt={prov.provider_name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {prov.provider_name}
                        </Typography>
                        <Button
                          size="small"
                          href={movie.providers.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Assistir
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}

                {movie.providers.rent?.map((prov) => (
                  <Grid key={prov.provider_id} item xs={12} sm={6} md={4}>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.25,
                        borderRadius: 2,
                      }}
                    >
                      <Avatar
                        variant="rounded"
                        src={
                          prov.logo_path.startsWith('http')
                            ? prov.logo_path
                            : `https://image.tmdb.org/t/p/w92${prov.logo_path}`
                        }
                        alt={prov.provider_name}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography variant="body2" fontWeight={600}>
                          {prov.provider_name}
                        </Typography>
                        <Button
                          size="small"
                          href={movie.providers.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Alugar
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 2,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                }}
              >
                <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                  Ainda não disponível para streaming, aluguel ou compra.
                </Typography>
              </Paper>
            )}
          </Box>

          <Box sx={{ mt: 1 }}>
            <Typography variant="h6" sx={{ mb: 1.5 }}>
              Elenco principal
            </Typography>

            {movie?.credits?.length ? (
              <Grid container spacing={4} justifyContent="center">
                {movie.credits.map((p) => (
                  <Grid key={p.id} item xs={6} sm={4} md={3} xl={2}>
                    <ActorItem
                      name={p.name}
                      character={p.character}
                      profilePath={p.profile_path}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="text.secondary">
                Elenco não disponível.
              </Typography>
            )}
          </Box>
        </Container>
      </>
    </LoadingOrEmptyState>
  )
}

export default MovieDetailsPage
