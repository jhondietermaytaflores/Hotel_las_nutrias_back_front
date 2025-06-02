import { Link } from 'react-router-dom'
import { useState } from 'react'
import clsx from 'clsx'

function Sidebar()
{
  const [hoverHabitaciones, setHoverHabitaciones] = useState(false)
    const [hoverInventario, setHoverInventario] = useState(false)

      const [hoverUsuarios, setHoverUsuarios] = useState(false)

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Administrador</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/admin" className="hover:underline">Inicio</Link>


        <div
          onMouseEnter={() => setHoverHabitaciones(true)}
          onMouseLeave={() => setHoverHabitaciones(false)}
          className="relative"
        >
          <div className="flex items-center justify-between cursor-pointer hover:underline">
            <span>Habitaciones y Catalogo</span>
            <span>{hoverHabitaciones ? '▴' : '▾'}</span>
          </div>
          <div
            className={clsx(
              "ml-4 mt-1 flex flex-col gap-2 text-sm overflow-hidden transition-all duration-300",
              hoverHabitaciones ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <Link to="/admin/habitaciones" className="hover:underline">Gestion de Habitaciones</Link>

            <Link to="/admin/catalogo-habitaciones" className="hover:underline">Catálogo de Habitaciones</Link>
            
          </div>
        </div>

        



        <Link to="/admin/reservas" className="hover:underline">Reservas</Link>
        <Link to="/admin/pedidos" className="hover:underline">Pedidos</Link>
        <Link to="/admin/productos" className="hover:underline">Productos</Link>
        

        
        {/* Submenú Usuarios */}
      <div
        onMouseEnter={() => setHoverUsuarios(true)}
        onMouseLeave={() => setHoverUsuarios(false)}
        className="relative"
      >
        <div className="flex items-center justify-between cursor-pointer hover:underline">
          <span>Usuarios</span>
          <span>{hoverUsuarios ? '▴' : '▾'}</span>
        </div>
        <div
          className={clsx(
            "ml-4 mt-1 flex flex-col gap-2 text-sm overflow-hidden transition-all duration-300",
            hoverUsuarios ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <Link to="/admin/usuarios-clientes" className="hover:underline">Gestion de Clientes</Link>
          <Link to="/admin/usuarios-empleados" className="hover:underline">Gestion de Empleados</Link>
        </div>
      </div>



        {/* <div
          onMouseEnter={() => setHoverInventario(true)}
          onMouseLeave={() => setHoverInventario(false)}
        >
          <span className="hover:underline cursor-pointer">Inventarios y Asignaciones ▾</span>
          {hoverInventario && (
            <div className="ml-4 mt-1 flex flex-col gap-2 text-sm">
              <Link to="/admin/inventario" className="hover:underline">Inventario General</Link>
              <Link to="/admin/inventarioHabitacion" className="hover:underline">Asignaciones Por Habitación</Link>
              <Link to="/admin/inventarioSector" className="hover:underline">Asignaciones Por Sector</Link>
            </div>
          )}
        </div> */}

        <div
          onMouseEnter={() => setHoverInventario(true)}
          onMouseLeave={() => setHoverInventario(false)}
          className="relative"
        >
          <div className="flex items-center justify-between cursor-pointer hover:underline">
            <span>Inventarios y Asignaciones</span>
            <span>{hoverInventario ? '▴' : '▾'}</span>
          </div>

          {/* Submenú animado */}
          <div
            className={clsx(
              "ml-4 mt-1 flex flex-col gap-2 text-sm overflow-hidden transition-all duration-300",
              hoverInventario ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <Link to="/admin/inventario" className="hover:underline">Inventario General</Link>
            <Link to="/admin/inventarioHabitacion" className="hover:underline">Asignaciones Por Habitación</Link>
            <Link to="/admin/inventarioSector" className="hover:underline">Asignaciones Por Sector</Link>
          </div>
        </div>


        <Link to="/" className="text-red-300 mt-6">Cerrar sesión</Link>
      </nav>
    </aside>
  )
}

export default Sidebar
