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
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import { useParams } from "react-router-dom";
import noPoster from "../../assets/Image-not-found.png";
import { ActorItem } from "../../components/actor-item/ActorItem";

const tmdbImg = (path, size = "w1280") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : noPoster;

function ScorePill({ value }) {
    return (
        <Box
            sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1.25,
                px: 1.25,
                py: 0.5,
                borderRadius: 999,
                backgroundColor: "rgba(0,0,0,.35)",
                color: "#fff",
            }}
        >
            <Box sx={{ position: "relative", width: 36, height: 36 }}>
                <CircularProgress variant="determinate" value={value} size={36} thickness={4} />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12,
                        fontWeight: 700,
                    }}
                >
                    {Math.round(value)}
                </Box>
            </Box>
            <Typography variant="body2">Avaliação</Typography>
        </Box>
    );
}

function MovieDetailsPage() {
    const { id } = useParams();

    /** MOCK:*/
    const movie = {
        id,
        originalTitle: "Lilo & Stich",
        title: "Lilo & Stich",
        overview:
            'conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um alienígena perigoso que escapou de um planeta',
        posterPath: "/cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
        backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
        originalLanguage: "Português - Brasil",
        releaseDate: "2023-03-08",
        genres: [{ id: 1, name: "Família" }, { id: 2, name: "Aventura" }],
        voteAverage: 7.1,
        cast: [
            {
                id: 819,
                name: "Edward Norton",
                character: "The Narrator",
                order: 0,
                profile_path: "/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg",
            },
            { id: 2, name: "Keira Knightley", character: "Laura Blacklock", order: 1, profile_path: "/bDkXb5oS6n3H0C0y6J9eS0dQ9fG.jpg" },
            { id: 3, name: "Outro Ator", character: "Algum Papel", order: 2, profile_path: null },
        ],
    };

    return (
        <>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    width: "100vw",
                    left: "50%",
                    right: "50%",
                    ml: "-50vw",
                    mr: "-50vw",
                    mb: 3,
                    overflow: "hidden",
                }}
            >
                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${tmdbImg(movie.backdrop_path)})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(10px)",
                        transform: "scale(1.06)",
                    }}
                />

                <Box
                    aria-hidden
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,.70) 0%, rgba(0,0,0,.45) 40%, rgba(0,0,0,0) 100%)",
                    }}
                />

                <Box
                    aria-hidden
                    sx={() => ({
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        height: { xs: 64, sm: 96 },
                        background: "linear-gradient(to bottom, #0d1115 0%, rgba(0,0,0,0) 100%)",
                        pointerEvents: "none",
                    })}
                />

                <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
                    <Box
                        sx={{
                            position: "relative",
                            borderRadius: 2,
                            boxShadow: 3,
                            backdropFilter: "blur(6px)",
                            backgroundColor: "rgba(0,0,0,.25)",
                            p: { xs: 2, sm: 3, md: 4 },
                            color: "common.white",
                        }}
                    >
                        <Box
                            sx={{
                                display: "grid",
                                rowGap: 2,
                                columnGap: 3,
                                gridTemplateColumns: { xs: "1fr", sm: "auto 1fr" },
                                gridTemplateAreas: {
                                    xs: `"title" "poster" "info"`,
                                    sm: `"title  ." "poster info"`,
                                },
                                alignItems: "start",
                            }}
                        >
                            <Box sx={{ gridArea: "title" }}>
                                <Typography variant="h5" component="h1" fontWeight="bold">
                                    {movie.title}
                                </Typography>

                                {/* Gêneros */}
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                                    {movie.genres?.filter((g) => g.name).map((g) => (
                                        <Chip
                                            key={g.id ?? g.name}
                                            label={g.name}
                                            size="small"
                                            variant="outlined"
                                            sx={{ color: "#fff", borderColor: "rgba(255,255,255,.35)" }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                            <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="flex-end" >
                                <ScorePill value={movie.voteAverage*10} />
                                <Button variant="contained" color="primary" startIcon={<PlayArrowRounded />}>
                                    REPRODUZIR TRAILER
                                </Button>
                                <Tooltip title="Adicionar aos favoritos">
                                    <IconButton color="inherit" aria-label="favoritar">
                                        <FavoriteBorder />
                                    </IconButton>
                                </Tooltip>
                            </Stack>

                            <Card
                                sx={{
                                    gridArea: "poster",
                                    width: { xs: 200, sm: 240 },
                                    borderRadius: 2,
                                    boxShadow: 4,
                                    transition: "transform .2s ease",
                                    "&:hover": { transform: "translateY(-2px)" },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    src={tmdbImg(movie.posterPath)}
                                    alt={movie.originalTitle || movie.title}
                                    loading="lazy"
                                    srcSet={`${tmdbImg(movie.posterPath, "w185")} 1x, ${tmdbImg(
                                        movie.posterPath,
                                        "w500"
                                    )} 2x`}
                                    sx={{ width: "100%", height: { xs: 300, sm: 360 }, objectFit: "cover" }}
                                />
                            </Card>

                            <Box sx={{ gridArea: "info", minWidth: 0, overflow: "hidden" }}>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
                                        columnGap: 2,
                                        rowGap: 1.25,
                                        alignItems: "baseline",
                                    }}
                                >
                                    <Typography fontWeight="bold">Título original</Typography>
                                    <Typography sx={{ overflowWrap: "anywhere" }}>{movie.originalTitle}</Typography>

                                    <Typography fontWeight="bold">Lançamento</Typography>
                                    <Typography sx={{ overflowWrap: "anywhere" }}>{movie.releaseDate}</Typography>

                                    <Typography fontWeight="bold">Idioma original</Typography>
                                    <Typography sx={{ overflowWrap: "anywhere" }}>{movie.originalLanguage}</Typography>
                                </Box>

                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                                    Sinopse
                                </Typography>
                                <Typography sx={{ maxWidth: 1000, lineHeight: 1.7, color: "rgba(255,255,255,.9)" }}>
                                    {movie.overview}
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
                    <Grid container spacing={2} sx={{ maxWidth: 820 }}>
                        {[1, 2, 3].map((i) => (
                            <Grid key={i} item xs={12} sm={6} md={4}>
                                <Paper
                                    variant="outlined"
                                    sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1.25, borderRadius: 2 }}
                                >
                                    <Avatar variant="rounded" />
                                    <Box>
                                        <Typography variant="body2" fontWeight={600}>
                                            Netflix
                                        </Typography>
                                        <Button size="small">Assistir</Button>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                <Box sx={{ mt: 1 }}>
                    <Typography variant="h6" sx={{ mb: 1.5 }}>
                        Elenco principal
                    </Typography>
                    <Box
                        sx={{
                            overflowX: "auto",
                            display: "flex",
                            gap: 2,
                            scrollSnapType: "x mandatory",
                            pb: 1,
                            "& > *": { scrollSnapAlign: "start" },
                        }}
                    >
                        {movie.cast.map((p) => (
                            <ActorItem
                                key={p.id}
                                name={p.name}
                                character={p.character}
                                profilePath={p.profile_path}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </>
    );
}

export default MovieDetailsPage;
