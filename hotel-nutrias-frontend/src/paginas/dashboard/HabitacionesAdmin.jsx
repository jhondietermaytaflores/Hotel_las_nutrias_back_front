import { useEffect, useState } from 'react'
import { api } from '../../servicios/api'
import Swal from 'sweetalert2'

function HabitacionesAdmin() {
  const [habitaciones, setHabitaciones] = useState([])
  const [modo, setModo] = useState('crear')
  const [form, setForm] = useState({
    numero: '',
    descripcion: '',
    precio: '',
    id_piso: '',
    id_categoria: '',
    estado: 'libre',
  })

  const obtenerHabitaciones = async () => {
    const { data } = await api.get('/habitaciones/todas')
    setHabitaciones(data)
  }

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const enviarFormulario = async (e) => {
    e.preventDefault()
    try {
      if (modo === 'crear') {
        await api.post('/habitaciones', form)
        Swal.fire('Habitación creada', '', 'success')
      } else {
        await api.put(`/habitaciones/${form.id_habitacion}`, form)
        Swal.fire('Habitación actualizada', '', 'success')
      }
      setForm({ numero: '', descripcion: '', precio: '', id_piso: '', id_categoria: '', estado: 'libre' })
      setModo('crear')
      obtenerHabitaciones()
    } catch (err) {
      Swal.fire('Error', 'Ocurrió un problema', 'error')
    }
  }

  const cargarEdicion = (hab) => {
    setForm(hab)
    setModo('editar')
  }

  const eliminarHabitacion = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Eliminar habitación?',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    })
    if (confirm.isConfirmed) {
      await api.delete(`/habitaciones/${id}`)
      obtenerHabitaciones()
      Swal.fire('Eliminado', '', 'success')
    }
  }

  useEffect(() => {
    obtenerHabitaciones()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de habitaciones</h2>

      {/* Formulario */}
      <form onSubmit={enviarFormulario} className="bg-white p-4 rounded shadow mb-6 grid gap-4 md:grid-cols-2">
        <input name="numero" value={form.numero} onChange={manejarCambio} placeholder="Número" className="border p-2" required />
        <input name="descripcion" value={form.descripcion} onChange={manejarCambio} placeholder="Descripción" className="border p-2" required />
        <input name="precio" value={form.precio} onChange={manejarCambio} placeholder="Precio" type="number" className="border p-2" required />
        <input name="id_piso" value={form.id_piso} onChange={manejarCambio} placeholder="ID Piso" className="border p-2" required />
        <input name="id_categoria" value={form.id_categoria} onChange={manejarCambio} placeholder="ID Categoría" className="border p-2" required />
        <select name="estado" value={form.estado} onChange={manejarCambio} className="border p-2">
          <option value="libre">Libre</option>
          <option value="ocupada">Ocupada</option>
          <option value="mantenimiento">Mantenimiento</option>
          <option value="limpieza">Limpieza</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 rounded col-span-2">
          {modo === 'crear' ? 'Crear' : 'Actualizar'} habitación
        </button>
      </form>

      {/* Tabla */}
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Número</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Piso</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {habitaciones.map((h) => (
            <tr key={h.id_habitacion} className="text-center border-t">
              <td className="p-2">{h.numero}</td>
              <td>{h.descripcion}</td>
              <td>{h.precio}</td>
              <td>{h.id_piso}</td>
              <td>{h.id_categoria}</td>
              <td>{h.estado}</td>
              <td>
                <button onClick={() => cargarEdicion(h)} className="bg-yellow-500 text-white px-2 py-1 rounded mx-1">
                  Editar
                </button>
                <button onClick={() => eliminarHabitacion(h.id_habitacion)} className="bg-red-600 text-white px-2 py-1 rounded mx-1">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HabitacionesAdmin
