import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between">
      <h1 className="font-bold">Hotel Las Nutrias</h1>
      <nav className="space-x-4">
        <Link to="/habitaciones" className="hover:underline">Habitaciones</Link>
        <Link to="/reservas" className="hover:underline">Reservas</Link>
        <Link to="/" onClick={() => localStorage.clear()} className="hover:underline text-red-300">
          Cerrar sesión
        </Link>
      </nav>
    </header>
  )
}

export default Header
