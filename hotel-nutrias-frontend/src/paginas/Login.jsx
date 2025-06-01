import { useState } from "react"
import { api } from "../servicios/api"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function Login() {
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const navigate = useNavigate()

  // Utiliza el hook useAuth para obtener la función login
  const { login } = useAuth() 

  const handleLogin = async (e) => {
    e.preventDefault()
        try {
          const { data } = await api.post("/auth/login", {
            email: correo,
            password: contrasena
          })
        
          const usuario = data.usuario // <-- tu backend debe devolver esto
          const token = data.token     // <-- tu backend debe devolver esto también
        
          if (!usuario || !token) {
            return Swal.fire("Error", "Respuesta inválida del servidor", "error")
          }
        
          login({ ...usuario, token }) // guarda en contexto
        
          Swal.fire("Éxito", "Inicio de sesión correcto", "success")
        
          if (usuario.id_rol === 1) {
            navigate('/admin')
          } else {
            navigate('/habitaciones')
          }
        
        } catch (err) {
          console.error("Error al iniciar sesión:", err)
          Swal.fire("Error", err.response?.data?.error || "Credenciales inválidas", "error")
        }

        //funcionaba el login antes , pero agregamos vistas para cada rol y ahora no funciona
      /* const { data  } = await api.post("/auth/login", {  email: correo, password: contrasena })
      localStorage.setItem("token", data.token)
      Swal.fire("Éxito", "Inicio de sesión correcto", "success")
      navigate("/habitaciones") */
    
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full border p-2 mb-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full border p-2 mb-3"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
