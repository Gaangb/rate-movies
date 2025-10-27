import { useEffect, useMemo, useState } from "react"

export function useMovies() {
  const [movies, setMovies] = useState([{
    id: '',
    originalTitle: '',
    title: '',
    posterPath: '',
    overview: '',
    originalLanguage: '',
    releaseDate: '',
    genres: [{ id: 0, name: '' }],
    voteAverage: 0,
    backdrop_path: '',
    voteCount: 0,
    popularity: 0,
    adult: false
    // providers: {flatrate: }
  }])

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
        id: "3",
        originalTitle: "Barbie",
        title: "Barbie",
        overview:
          "Barbie vive em Barbielândia, um mundo perfeito, até que começa a questionar a realidade e parte para o mundo humano em busca de respostas.",
        posterPath: "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
        originalLanguage: "en",
        releaseDate: "2023-07-20",
        genres: [
          { id: 35, name: "Comédia" },
          { id: 12, name: "Aventura" },
          { id: 14, name: "Fantasia" },
        ],
        voteAverage: 7.1,
        voteCount: 14500,
        popularity: 802.4,
        adult: false,
      },
      {
        id: "4",
        originalTitle: "Oppenheimer",
        title: "Oppenheimer",
        overview:
          "A biografia do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial.",
        posterPath: "/ptpr0kGAckfQkJeJIt8st5sT0gp.jpg",
        backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
        originalLanguage: "en",
        releaseDate: "2023-07-21",
        genres: [
          { id: 18, name: "Drama" },
          { id: 36, name: "História" },
        ],
        voteAverage: 8.3,
        voteCount: 128000,
        popularity: 684.2,
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
      },
      {
        id: "6",
        originalTitle: "Elemental",
        title: "Elementos",
        overview:
          "Ember e Wade vivem em uma cidade onde moradores de fogo, água, terra e ar convivem, descobrindo o quanto têm em comum.",
        posterPath: "/4Y1W8f5ktvI4n5Wfs65QnX0r5qE.jpg",
        backdrop_path: "/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
        originalLanguage: "en",
        releaseDate: "2023-06-16",
        genres: [
          { id: 16, name: "Animação" },
          { id: 10751, name: "Família" },
          { id: 10749, name: "Romance" },
        ],
        voteAverage: 7.4,
        voteCount: 6200,
        popularity: 455.9,
        adult: false,
      },
    ])
  }, [])

  return useMemo(() => ({ movies }), [movies])
}