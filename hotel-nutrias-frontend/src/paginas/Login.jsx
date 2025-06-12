import { useState } from "react"
import { api } from "../servicios/api"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

import FaceLoginDescriptors from "./empleados/FaceLoginDescriptors"
import { Dialog } from "@headlessui/react"

function Login() {
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
    const [modalAbierto, setModalAbierto] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post("/auth/login", {
        email: correo,
        password: contrasena
      })

      const usuario = data.usuario
      const token = data.token

      if (!usuario || !token) {
        return Swal.fire("Error", "Respuesta inválida del servidor", "error")
      }

      login({ ...usuario, token })

      Swal.fire("Éxito", "Inicio de sesión correcto", "success")

      if (usuario.id_rol === 1) {
        navigate('/admin')
      } else {
        navigate('/habitaciones')   //manejo para clientes
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err)
      Swal.fire("Error", err.response?.data?.error || "Credenciales inválidas", "error")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-[#121212]">
      <form onSubmit={handleLogin} className="bg-[#1E1E2F] p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Iniciar Sesión</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Correo electrónico</label>
          <input
            type="email"
            placeholder="ejemplo@nutrias.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2D2D44] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
          <input
            type="password"
            placeholder="tu contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full px-4 py-2 rounded bg-[#2D2D44] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 rounded transition duration-300"
        >
          Iniciar sesión
        </button>

        <button
          type="button"
          onClick={() => setModalAbierto(true)}
          className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded transition duration-300"
        >
          Iniciar con rostro
        </button>

      </form>

      {/* Modal de login facial */}
      <Dialog open={modalAbierto} onClose={() => setModalAbierto(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-[#1E1E2F] p-6 rounded shadow-lg">
            <Dialog.Title className="text-white text-xl mb-2">Login Facial</Dialog.Title>
            <FaceLoginDescriptors
              onSuccess={(usuario) => {
                login(usuario)
                setModalAbierto(false)
                Swal.fire("Éxito", `Bienvenido ${usuario.nombre}`, "success")
                if (usuario.id_rol === 1) {
                  navigate("/admin")
                } else {
                  navigate("/habitaciones")
                }
              }}
            />
            <button
              onClick={() => setModalAbierto(false)}
              className="mt-4 w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded"
            >
              Cancelar
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

    </div>
  )
}

export default Login
