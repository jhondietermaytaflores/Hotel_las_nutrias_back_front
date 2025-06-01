import Sidebar from './Sidebar'
import Header from './Header'
import { useAuth } from '../hooks/useAuth'



function DashboardLayout({ children }) {
    const { usuario, logout } = useAuth()
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="bg-white px-6 py-3 shadow flex justify-between items-center border-b">
          <div>
            <span className="text-sm text-gray-600">Bienvenido, </span>
            <span className="font-semibold text-blue-600">{usuario?.nombre}</span>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded shadow"
          >
            Cerrar sesión
          </button>
        </div>
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
