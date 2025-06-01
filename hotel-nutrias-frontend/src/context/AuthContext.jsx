import { createContext, useContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('usuario')
    if (user) setUsuario(JSON.parse(user))
  }, [])

  const login = (usuarioData) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioData))
    setUsuario(usuarioData)
  }

  const logout = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
