import { Link } from "react-router-dom"

function Header() {


  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Título del hotel */}
      <h1 className="text-2xl font-extrabold text-white tracking-wide">
        Hotel Las Nutrias
      </h1>

      {/* Navegación principal */}
      <nav className="flex items-center gap-8">
        <Link
          to="/habitaciones"
          className="text-white hover:text-yellow-300 font-medium transition duration-200"
        >
          Habitaciones
        </Link>
        <Link
          to="/reservas"
          className="text-white hover:text-yellow-300 font-medium transition duration-200"
        >
          Reservas
        </Link>

        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input type="checkbox" value="synthwave" className="toggle theme-controller" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        {/* Avatar del usuario */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
          <img
            src="https://i.pravatar.cc/100?img=12" // Puedes reemplazar por el avatar real del usuario
            alt="Usuario"
            className="w-full h-full object-cover"
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
