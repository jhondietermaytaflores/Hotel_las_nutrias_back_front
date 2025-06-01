import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// 🔒 Solo ADMIN
export const RutaAdmin = ({ children }) => {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/" />
  if (usuario.id_rol !== 1) return <Navigate to="/no-autorizado" />
  return children
}

// 🔒 Solo CLIENTE
export const RutaCliente = ({ children }) => {
  const { usuario } = useAuth()
  if (!usuario) return <Navigate to="/" />
  if (usuario.id_rol !== 3) return <Navigate to="/no-autorizado" />
  return children
}
