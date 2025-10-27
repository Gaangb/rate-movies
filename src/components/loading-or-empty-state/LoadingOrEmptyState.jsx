import { Box, CircularProgress, Typography } from '@mui/material'

function LoadingOrEmptyState({
  loading,
  hasItems,
  emptyMessage = 'Nenhum item encontrado.',
  loadingMessage = 'Carregando...',
  children,
}) {
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          color: 'text.secondary',
        }}
      >
        <CircularProgress size={32} sx={{ mb: 2 }} />
        <Typography>{loadingMessage}</Typography>
      </Box>
    )
  }

  if (!hasItems) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 6,
          color: 'text.secondary',
        }}
      >
        <Typography>{emptyMessage}</Typography>
      </Box>
    )
  }

  return <>{children}</>
}

export default LoadingOrEmptyState
