import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

function NavBar() {
  const [params] = useSearchParams()
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    setTerm(params.get('q') || '')
  }, [params])

  const onSubmit = (e) => {
    e.preventDefault()
    const q = term.trim()
    if (q) navigate(`/?q=${encodeURIComponent(q)}`)
    else navigate(`/`)
  }

  return (
    <nav
      className="navbar navbar-expand-lg bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="3"
              y="5"
              width="18"
              height="14"
              rx="2"
              ry="2"
              stroke="currentColor"
              strokeWidth="1.7"
            />
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.7" />
            <path
              d="M6 5l2.5 4M10 5l2.5 4M14 5l2.5 4M18 5l2.5 4"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path d="M10 11.5v5l4.5-2.5-4.5-2.5z" fill="currentColor" />
          </svg>
          <span className="d-none d-md-inline">RateMovies</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favoritos
              </Link>
            </li>
          </ul>

          <form className="d-flex" role="search" onSubmit={onSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Lilo & Stitch"
              aria-label="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
