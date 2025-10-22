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
    genres: [{ id: null, name: '' }],
    voteAverage: '',
    // providers: {flatrate: }
  }])

  useEffect(() => {
    setMovies([
      {
        id: '1',
        originalTitle: 'Lilo & Stich',
        title: "Lilo & Stich",
        overview: 'conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um alienígena perigoso que escapou de um planeta',
        posterPath: "cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
        originalLanguage: "Português - Brasil",
        releaseDate: "2023-03-08",
        genres: [{ id: null, name: '' }],
        voteAverage: '6.5',
      },
      {
        id: '2',
        originalTitle: 'Lilo & Stich',
        title: "Lilo & Stich",
        overview: 'conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um alienígena perigoso que escapou de um planeta',
        posterPath: "cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
        originalLanguage: "Português - Brasil",
        releaseDate: "2023-03-08",
        genres: [{ id: null, name: '' }],
        voteAverage: '6.5',
      },
      {
        id: "3",
        originalTitle: 'Lilo & Stich',
        title: "Lilo & Stich",
        overview: 'conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um alienígena perigoso que escapou de um planeta',
        posterPath: "cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
        originalLanguage: "Português - Brasil",
        releaseDate: "2023-03-08",
        genres: [{ id: null, name: '' }],
        voteAverage: '6.5',
      },
      {
        id: "4",
        originalTitle: 'Lilo & Stich',
        title: "Lilo & Stich",
        overview: 'conta a história de uma garota havaiana solitária, Lilo, que adota um "cachorro" azul chamado Stitch, sem saber que ele é um alienígena perigoso que escapou de um planeta',
        posterPath: "cm8TNGBGG0aBfWj0LgrESHv8tir.jpg",
        originalLanguage: "Português - Brasil",
        releaseDate: "2023-03-08",
        genres: [{ id: null, name: '' }],
        voteAverage: '6.5',
      }
    ])
  }, [])

  return useMemo(
    () => ({
      movies,
    }),
    [movies]
  )
}