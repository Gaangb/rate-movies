import apiMovies from '../api/api'

export async function handleApiRequest(
  requestFn,
  errorMessage = 'Erro inesperado',
) {
  try {
    const response = await requestFn()
    return response
  } catch (err) {
    console.error('API Error:', err)
    const apiMessage =
      err?.response?.data?.detail ||
      err?.response?.data?.message ||
      err?.message ||
      'Falha ao conectar ao servidor'
    throw new Error(`${errorMessage}: ${apiMessage}`)
  }
}

export async function apiGet(endpoint, params = {}) {
  return handleApiRequest(
    () => apiMovies.get(endpoint, { params }),
    `Erro ao buscar ${endpoint}`,
  )
}

export async function apiPost(endpoint, payload) {
  return handleApiRequest(
    () => apiMovies.post(endpoint, payload),
    `Erro ao enviar dados para ${endpoint}`,
  )
}
