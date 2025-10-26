import { Outlet } from "react-router-dom"
import NavBar from "../components/nav-bar/NavBar"
import { Box } from "@mui/material"

function AppLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          mt: "auto",
          textAlign: "center",
          py: 2,
          backgroundColor: "background.paper",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <span className="text-muted">
          © {new Date().getFullYear()} RateMovies
        </span>
        <br />
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="text-muted"
          style={{ textDecoration: "none" }}
        >
          Dados de filmes por TMDb
        </a>
      </Box>
    </Box>
  )
}

export default AppLayout
