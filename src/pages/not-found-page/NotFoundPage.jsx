import { Box, Container } from '@mui/material'

function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box
        sx={{
          minHeight: '60vh',
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          color: 'text.primary',
          gap: 3,
        }}
      >
        <Box
          component="svg"
          viewBox="0 0 600 240"
          role="img"
          aria-labelledby="t d"
          sx={{ width: '100%', maxWidth: 680, height: 'auto' }}
        >
          <title id="t">404 — Página não encontrada</title>
          <desc id="d">
            Ilustração simples com o número 404 e uma claquete.
          </desc>

          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <g transform="translate(60,70)">
              <rect x="0" y="30" width="120" height="70" rx="8"></rect>
              <rect x="-6" y="0" width="132" height="32" rx="6"></rect>
              <path
                d="M12 0 L30 32 M44 0 L62 32 M76 0 L94 32 M108 0 L126 32"
                strokeWidth="6"
              ></path>
            </g>
            <path d="M250 60 L210 120 L270 120 L270 180" />
            <circle cx="330" cy="120" r="40" />
            <path d="M450 60 L410 120 L470 120 L470 180" />
          </g>

          <g
            fill="currentColor"
            fontFamily="Inter, system-ui, Segoe UI, Roboto, Arial"
            textAnchor="middle"
          >
            <text x="300" y="208" fontSize="16" opacity=".8">
              Página não encontrada
            </text>
          </g>
        </Box>
      </Box>
    </Container>
  )
}

export default NotFoundPage
