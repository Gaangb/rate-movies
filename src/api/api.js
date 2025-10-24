import axios from "axios"

const apiMovies = axios.create({
  baseURL: import.meta.env.VITE_API_MOVIES,
})

export default apiMovies