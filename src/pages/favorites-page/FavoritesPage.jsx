import { Box, Container, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react"
import MovieCard from "../../components/movie-card/movieCard";

function FavoritesPage() {
    const [movies, setMovies] = useState([])
    const [favorites, setFavorites] = useState(() => new Set());

    useEffect(() => {
        setMovies([
            {
                id: "1",
                originalTitle: "Lilo & Stitch",
                title: "Lilo & Stitch",
                overview:
                    'Conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um experimento alienígena que escapou de outro planeta.',
                posterPath: "/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
                backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
                originalLanguage: "pt-BR",
                releaseDate: "2023-03-08",
                genres: [
                    { id: 16, name: "Animação" },
                    { id: 10751, name: "Família" },
                    { id: 35, name: "Comédia" },
                ],
                voteAverage: 6.5,
                voteCount: 1287,
                popularity: 324.7,
                adult: false,
            },
            {
                id: "2",
                originalTitle: "Spider-Man: Across the Spider-Verse",
                title: "Homem-Aranha: Através do Aranhaverso",
                overview:
                    "Miles Morales retorna para uma nova aventura através do multiverso, unindo forças com Gwen Stacy e uma nova equipe de Pessoas-Aranha.",
                posterPath: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
                backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
                originalLanguage: "en",
                releaseDate: "2023-06-02",
                genres: [
                    { id: 28, name: "Ação" },
                    { id: 16, name: "Animação" },
                    { id: 12, name: "Aventura" },
                ],
                voteAverage: 8.4,
                voteCount: 9800,
                popularity: 915.3,
                adult: false,
            },
            {
                id: "5",
                originalTitle: "The Super Mario Bros. Movie",
                title: "Super Mario Bros. O Filme",
                overview:
                    "Mario e Luigi viajam por um reino mágico para salvar a Princesa Peach de Bowser.",
                posterPath: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
                backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
                originalLanguage: "en",
                releaseDate: "2023-04-05",
                genres: [
                    { id: 16, name: "Animação" },
                    { id: 10751, name: "Família" },
                    { id: 12, name: "Aventura" },
                ],
                voteAverage: 7.7,
                voteCount: 12000,
                popularity: 590.1,
                adult: false,
            }
        ])
    }, [])

    const toggleFavorite = (m) => {
        setFavorites((prev) => {
            const next = new Set(prev);
            next.has(m.id) ? next.delete(m.id) : next.add(m.id);
            return next;
        });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    mb: 1.5,
                    px: { xs: 2, md: 0 },
                }}
            >
                <Typography variant="h6">Favoritos</Typography>
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
    )
}

export default FavoritesPage