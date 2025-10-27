import axios from 'axios'

const apiMovies = axios.create({
  baseURL: import.meta.env.VITE_API_MOVIES,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
})

export default apiMovies
