import { Box, CircularProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const AppLayout = lazy(() => import('../layout/AppLayout'))
const HomePage = lazy(() => import('../pages/home-page/HomePage'))
const MovieDetails = lazy(
  () => import('../pages/movie-details-page/MovieDetailsPage'),
)
const FavoritesPage = lazy(
  () => import('../pages/favorites-page/FavoritesPage'),
)
const SharedListPage = lazy(
  () => import('../pages/shared-list-page/SharedListPage'),
)
const NotFoundPage = lazy(() => import('../pages/not-found-page/NotFoundPage'))

const withSuspense = (element) => (
  <Suspense
    fallback={
      <Box
        sx={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <CircularProgress size={48} />
      </Box>
    }
  >
    {element}
  </Suspense>
)

export const router = createBrowserRouter([
  {
    element: withSuspense(<AppLayout />),
    errorElement: withSuspense(<NotFoundPage />),
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'movie/:id', element: withSuspense(<MovieDetails />) },
      { path: 'favorites', element: withSuspense(<FavoritesPage />) },
      { path: 'list/:slug', element: withSuspense(<SharedListPage />) },
      { path: '404', element: withSuspense(<NotFoundPage />) },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
])
