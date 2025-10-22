import { Grid } from '@mui/material';
import { useMovies } from "../../hooks/useMovies"
import MovieCard from "../../components/movie-card/movieCard"

function HomePage() {
  const { movies } = useMovies();

  return (
    <Grid container spacing={4}>
        {movies ? movies.map((movie) => (
          <Grid key={movie.id} size={{xl: 3, md: 4, xs: 12, sm: 6}}>
            <MovieCard movie={movie} />
          </Grid>
        )) : (<div>Nenhum filme encontrado</div>)}
    </Grid>
    //TODO decidir se vai fazer paginação ou mostrar por demanda
  )
}

export default HomePage