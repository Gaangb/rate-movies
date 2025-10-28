import { apiGet, apiPost } from './apiService'

export async function fetchMoviesService(pageNum = 1, query = '', accountId) {
  const base = query
    ? `movies/search/?query=${encodeURIComponent(query)}`
    : `discover/?`
  const url = `${base}&page=${pageNum}&account_id=${accountId}&language=pt-BR`
  const { data } = await apiGet(url)
  return data?.results || []
}

export async function toggleFavoriteService(movie, isFav, accountId) {
  const payload = {
    account_id: accountId,
    favorite: isFav,
    media_type: 'movie',
    movie_id: movie.id,
  }
  await apiPost('/favorites/', payload)
}

export async function fetchFavoritesService(accountId) {
  const { data } = await apiGet('/favorites/', { account_id: accountId })
  return data?.results ?? []
}

export async function shareFavoritesService(accountId, listName) {
  const payload = {
    account_id: Number(accountId),
    list_name: listName.trim().replace(/\s+/g, '-'),
  }
  await apiPost('/share-favorites/', payload)
}

export async function fetchSharedListService(slug) {
  const { data } = await apiGet('/get-shared-favorites/', {
    list_name: slug,
  })
  return data || []
}
