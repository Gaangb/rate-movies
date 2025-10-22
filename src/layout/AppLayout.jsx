import { Outlet } from "react-router-dom";
import NavBar from "../components/nav-bar/navBar";
import { Box } from "@mui/material";

function AppLayout() {

    return (
        <div>
            <NavBar />
            <main>
                <Box>
                    <Outlet />
                </Box>
            </main>
            <Box sx={{ position: "absolute", bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", width: "100%", padding: "10px" }}>
                <span className="text-muted">
                    © {new Date().getFullYear()} RateMovies
                </span>
                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted"
                >
                    Dados de filmes por TMDb
                </a>
            </Box>
        </div>
    );
}

export default AppLayout